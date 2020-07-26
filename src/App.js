import React, { Component } from 'react'
import './App.css'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'

class App extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleTextAreaChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  handleRadioChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Save Your Pastes!</h1>
          <p>This is a basic site for saving text online to retrieve later.</p>
        </Jumbotron>
        <Container fluid className="container">
          <Col className="col">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="pasteContent">
                <Form.Label>What do you want to save?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  onChange={this.handleTextAreaChange}
                />
              </Form.Group>
              <Form.Group
                controlId="pasteTimeToLive"
                onChange={this.handleRadioChange}
              >
                <Form.Label>How long do you want us to save it for?</Form.Label>
                <Form.Check
                  type="radio"
                  label="1 Day"
                  name="pasteTimeToLive"
                  value={1}
                  id="pasteTimeToLive1"
                />
                <Form.Check
                  type="radio"
                  label="30 Days"
                  name="pasteTimeToLive"
                  value={30}
                  id="pasteTimeToLive2"
                />
                <Form.Check
                  type="radio"
                  label="300 Days"
                  name="pasteTimeToLive"
                  value={300}
                  id="pasteTimeToLive3"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Container>
      </div>
    )
  }
}

export default App
