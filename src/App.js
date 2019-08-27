import React from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
} from 'react-router-dom'
import { Alignment, Navbar } from '@blueprintjs/core'
import './App.css'
import DisplayFibonacci from './display-fibonacci'
import DisplayBigData from './display-big-data'

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Navbar>
            <Navbar.Group align={ Alignment.LEFT }>
              <Link to="">
                <Navbar.Heading>Webworkers Hackathon</Navbar.Heading>
              </Link>
              <Navbar.Divider />
              <NavLink className="bp3-button bp3-minimal bp3-icon-numerical" to="/fibonacci">Fib numbers</NavLink>
              <Navbar.Divider />
              <NavLink className="bp3-button bp3-minimal bp3-icon-database" to="/bigdata">Crunch some data</NavLink>
            </Navbar.Group>
          </Navbar>
        </nav>
        <div className="stage">
          <Route
            exact={ true }
            path="/"
            render={ () => (
              <div className="bp3-callout .modifier">
                <h4 className="bp3-heading">Welcome to the hackathon</h4>
                <p>
                  Check out the slow running tasks on the
                  links above that might could be improved by some web workers.
                </p>
                <p>
                  This site was generated
                  with <a href="https://www.npmjs.com/package/create-react-app">create-react-app</a> and
                  uses <a href="https://blueprintjs.com/docs/#core/components/button-group">Blueprint JS</a> for styling and UI components.
                </p>
              </div>
            ) }
          />
          <Route path="/fibonacci" component={ DisplayFibonacci } />
          <Route path="/bigdata" component={ DisplayBigData } />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
