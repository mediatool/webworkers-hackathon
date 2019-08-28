import React, { useState, useEffect } from 'react'
import parseNumberAnd from './parse-number-and'
import Loader from './loader'
import './fibonacci.css'

let fibWorker

function DisplayFibonacci () {
  const [ wantedNumber, setNumber ] = useState(1)
  const [ calculatedValue, setCalculatedValue ] = useState(1)
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    fibWorker = new Worker(`${process.env.PUBLIC_URL}/nth-fibonacci.js`)
    fibWorker.onmessage = function (e) {
      setCalculatedValue(e.data)
      setIsLoading(false)
    }
    return () => {
      fibWorker.terminate()
    }
  }, [])

  useEffect(() => {
    fibWorker.postMessage(wantedNumber)
  }, [ wantedNumber ])

  function handleChange (n) {
    setIsLoading(true)
    setNumber(n)
  }

  return (
    <div>
      <div className="bp3-callout .modifier">
        <h4 className="bp3-heading">Fibonacci</h4>
        Type in a number n to find out what the nth fibonacci number is.<br />
        Somewhere just below 40 it starts to take time to compute.
        <br />
        <br />
        <input
          type="number"
          min="1"
          value={ wantedNumber }
          onChange={ parseNumberAnd(handleChange) }
        />
        <br />
        <h4 className="fib-number">Fibonacci number { wantedNumber } is </h4>
        <div className="fib-answer">{ isLoading ? <Loader /> : <code>{ calculatedValue }</code> }</div>
      </div>
    </div>
  )
}

export default DisplayFibonacci
