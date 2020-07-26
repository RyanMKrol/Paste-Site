import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'

import Cryptr from 'cryptr'
import fetch from 'node-fetch'

import './OutputPage.css'

class OutputPage extends Component {
  constructor(props) {
    super()

    this.state = {
      uri: props.uri,
      title: undefined,
      content: undefined
    }

    this.handleTextInputChange = this.handleTextInputChange.bind(this)
    this.handleDecrypt = this.handleDecrypt.bind(this)
  }

  componentDidMount() {
    const { uri } = this.props.match.params

    fetch(`/api/get/${uri}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          title: data.title,
          content: data.content
        })
      })
  }

  generateTitle() {
    return this.state.title ? (
      <Card.Header>{this.state.title}</Card.Header>
    ) : null
  }

  // handles change events of the text inputs
  handleTextInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  // encrypts any content with a key
  handleDecrypt() {
    const decryptionKey = this.state.decryptionKey
    const decryptionContent = this.state.content

    const cryptr = new Cryptr(decryptionKey)

    const decryptedContent = cryptr.decrypt(decryptionContent)

    this.setState({
      content: decryptedContent
    })
  }

  render() {
    return (
      <div className="masterContainer">
        <Jumbotron>
          <h1>Save Your Pastes! - OUTPUT</h1>
          <p>This is a basic site for saving text online to retrieve later.</p>
        </Jumbotron>
        <Container fluid="xl" className="output-page-container">
          <Col className="col">
            <Form.Group controlId={'decryptionKey'}>
              <Form.Label>Decryption Key</Form.Label>
              <Form.Control type="text" onChange={this.handleTextInputChange} />
            </Form.Group>
            <div className="buttonContainer">
              <Button variant="primary" onClick={this.handleDecrypt}>
                Decrypt
              </Button>
              <Button variant="success" onClick={this.handleDecrypt}>
                Decrypt
              </Button>
            </div>
            <Card bg={'secondary'} text={'light'}>
              {this.generateTitle()}
              <Card.Body>
                <Card.Text>{this.state.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    )
  }
}

export default OutputPage
