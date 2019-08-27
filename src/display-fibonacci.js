import React, { useState } from 'react'
import { compose } from 'yafu'
import nthFibonacci from './nth-fibonacci'

function parseTargetNumber (e) {
  return Number(e.target.value)
}

function DisplayFibonacci () {
  const [ wantedNumber, setNumber ] = useState(0)

  return (
    <div>
      Fibonacci number { wantedNumber } is { nthFibonacci(wantedNumber) }
      <input
        type="number"
        value={ wantedNumber }
        onChange={ compose(setNumber, parseTargetNumber) }
      />
    </div>
  )
}

export default DisplayFibonacci
