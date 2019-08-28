import React, { useState } from 'react'
import parseNumberAnd from './parse-number-and'

const fibWorker = new Worker(process.env.PUBLIC_URL + '/nth-fibonacci.js')

function DisplayFibonacci () {
  const [ wantedNumber, setNumber ] = useState(1)
  const [ calculatedValue, setCalculatedValue ] = useState(1)

  fibWorker.onmessage = function (e) {
    setCalculatedValue(e.data)
  }

  function handleChange (n) {
    setNumber(n)
    fibWorker.postMessage(n)
  }

  return (
    <div>
      <div className="bp3-callout .modifier">
        <h4 className="bp3-heading">Fibonacci</h4>
        Type in a number n to find out what the nth fibonacci number is.
        Somewhere just below 40 it starts to take time to compute.
        <br />
        <input
          type="number"
          min="1"
          value={ wantedNumber }
          onChange={ parseNumberAnd(handleChange) }
        />
        <br />
        Fibonacci number { wantedNumber } is { calculatedValue }
      </div>
    </div>
  )
}

export default DisplayFibonacci
