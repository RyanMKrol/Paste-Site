import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { InputPage } from './Pages'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <InputPage />
        </Route>
        <Route path="/paste">
          <InputPage />
        </Route>
      </Switch>
    </Router>
  )
}
