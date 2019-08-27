import React, { useState } from 'react'
import { map } from 'ramda'
import { TagInput } from '@blueprintjs/core'
import camelCase from 'camel-case'
import parseNumberAnd from './parse-number-and'
import summarizeEntries from './summarize-entries'
import generateEntries from './generate-entries'

const initialFields = [ 'Price', 'Impressions' ]

function DisplayBigData () {
  const [ wantedNumberEntries, setNumberEntries ] = useState(1000)
  const [ fields, setFields ] = useState(initialFields)

  const keys = map(camelCase, fields)
  const entries = generateEntries(keys, wantedNumberEntries)
  const sum = summarizeEntries(keys, entries)

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
