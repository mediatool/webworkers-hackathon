import React from 'react'
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import './App.css'
import DisplayFibonacci from './display-fibonacci'

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <NavLink to="/fibonacci">Fib numbers</NavLink>
          <NavLink to="/bigdata">Crunch some data</NavLink>
        </nav>
        <div className="stage">
          <Route path="/fibonacci" component={ DisplayFibonacci } />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
