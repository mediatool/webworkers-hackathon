import React, { useState, useEffect } from 'react'
import { map } from 'ramda'
import { TagInput } from '@blueprintjs/core'
import camelCase from 'camel-case'
import parseNumberAnd from './parse-number-and'
import generateEntries from './generate-entries'
import splitDataByProportion from './split-data-by-proportion'
import summarizeEntries from './summarize-entries'

const initialFields = [ 'Price', 'Impressions' ]


const summarizeEntriesWorkers = []
const NUMBER_OF_WORKERS = 10

function decrease (a) {
  return a - 1
}

function DisplayBigData () {
  const [ wantedNumberEntries, setNumberEntries ] = useState(1000)
  const [ fields, setFields ] = useState(initialFields)
  const keys = map(camelCase, fields)
  const [ sum, setSum ] = useState(summarizeEntries(keys, []))
  const [ activeWorkers, setActiveWorkers ] = useState(0)

  useEffect(() => {
    for (let i = 0; i < NUMBER_OF_WORKERS; i += 1) {
      summarizeEntriesWorkers[i] = new Worker(`${process.env.PUBLIC_URL}/summarize-entries.worker.js`)
      summarizeEntriesWorkers[i].onmessage = function (e) {
        setSum((currentSum) => summarizeEntries(keys, [ currentSum, e.data.res ]))
        setActiveWorkers(decrease)
      }
    }

    return () => {
      for (let i = 0; i < NUMBER_OF_WORKERS; i += 1) {
        summarizeEntriesWorkers[i].terminate()
      }
    }
  }, [])

  useEffect(() => {
    const entries = generateEntries(keys, wantedNumberEntries)
    const entriesToBeSent = splitDataByProportion(entries, NUMBER_OF_WORKERS)
    setSum(summarizeEntries(keys, []))
    setActiveWorkers((v) => v + NUMBER_OF_WORKERS)
    setTimeout(() => {
      for (let i = 0; i < NUMBER_OF_WORKERS; i += 1) {
        summarizeEntriesWorkers[i].postMessage(
          {
            keys,
            entries: entriesToBeSent[i],
            timeSent: Date.now(),
          }
        )
      }
    }, 200)
  }, [ wantedNumberEntries, fields ])

  return (
    <div>
      <div className="bp3-callout .modifier">
        <h4 className="bp3-heading">Big Data</h4>
        <br />
        Number of media entries to sum
        <input
          type="number"
          min="1"
          value={ wantedNumberEntries }
          onChange={ parseNumberAnd(setNumberEntries) }
        />
        <br />
        Fields on the media entries to sum
        <br />
        <TagInput
          onChange={ setFields }
          values={ fields }
        />
      </div>
      { activeWorkers > 0 && (
        <div>{ activeWorkers } workers, summarizing your entries for you...</div>
      ) }
      <div>
        The sum is:
        <ul>
          {
            map((f) => <li key={ f }>{ f }: { sum[camelCase(f)] }</li>, fields)
          }
        </ul>
      </div>
    </div>
  )
}

export default DisplayBigData
