import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { InputPage, OutputPage } from './Pages'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/paste">
          <OutputPage />
        </Route>
        <Route path="/">
          <InputPage />
        </Route>
      </Switch>
    </Router>
  )
}
