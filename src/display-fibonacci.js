import React, { useState } from 'react'
import nthFibonacci from './nth-fibonacci'
import parseNumberAnd from './parse-number-and'

function DisplayFibonacci () {
  const [ wantedNumber, setNumber ] = useState(1)

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
          onChange={ parseNumberAnd(setNumber) }
        />
        <br />
        Fibonacci number { wantedNumber } is { nthFibonacci(wantedNumber) }
      </div>
    </div>
  )
}

export default DisplayFibonacci
