import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import copy from 'copy-to-clipboard'
import Cryptr from 'cryptr'
import fetch from 'node-fetch'

import { PasteJumbotron } from './../../Components'

import './OutputPage.css'

const PASTE_DECRYPTION_KEY_ID = 'decryptionKey'

class OutputPage extends Component {
  constructor(props) {
    super()

    this.state = {
      uri: props.uri,
      title: undefined,
      content: undefined,
      [PASTE_DECRYPTION_KEY_ID]: ''
    }

    this.handleTextInputChange = this.handleTextInputChange.bind(this)
    this.handleDecrypt = this.handleDecrypt.bind(this)
    this.copyToClipboard = this.copyToClipboard.bind(this)
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
    const decryptionKey = this.state[PASTE_DECRYPTION_KEY_ID]
    const decryptionContent = this.state.content

    const cryptr = new Cryptr(decryptionKey)

    try {
      const decryptedContent = cryptr.decrypt(decryptionContent)

      this.setState({
        content: decryptedContent
      })
    } catch (error) {
      window.alert('Failed to decrypt your paste!')
    }
  }

  copyToClipboard() {
    copy(this.state.content)
  }

  render() {
    return (
      <div className="masterContainer">
        <PasteJumbotron>
          <h1>Save Your Pastes!</h1>
          <p>This is a basic site for saving text online to retrieve later.</p>
        </PasteJumbotron>
        <Container fluid="xl" className="outputPageContainer">
          <Col className="col">
            <Form.Group controlId={PASTE_DECRYPTION_KEY_ID}>
              <Form.Label>Decryption Key</Form.Label>
              <Form.Control type="text" onChange={this.handleTextInputChange} />
            </Form.Group>
            <div className="buttonContainer">
              <Button
                variant="primary"
                className="outputPageButton"
                disabled={this.state[PASTE_DECRYPTION_KEY_ID].length === 0}
                onClick={this.handleDecrypt}
              >
                Decrypt
              </Button>
              <Button
                variant="success"
                className="outputPageButton"
                onClick={this.copyToClipboard}
              >
                Copy
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
