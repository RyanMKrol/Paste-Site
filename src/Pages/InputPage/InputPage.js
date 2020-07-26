import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import Cryptr from 'cryptr'
import fetch from 'node-fetch'
import { v4 as uuidv4 } from 'uuid'

import { PasteJumbotron } from './../../Components'
import customSetState from './../../Utils'

import './InputPage.css'

const PASTE_TITLE_ID = 'pasteTitle'
const PASTE_CONTENT_ID = 'pasteContent'
const PASTE_ENCRYPTION_KEY_ID = 'encryptionKey'
const PASTE_TTL_ID = 'pasteTimeToLive'

class InputPage extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextInputChange = this.handleTextInputChange.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)

    this.state = {
      [PASTE_TTL_ID]: 1,
      submitting: false,
      [PASTE_TITLE_ID]: undefined,
      [PASTE_CONTENT_ID]: undefined,
      [PASTE_ENCRYPTION_KEY_ID]: undefined
    }
  }

  // handles submitting the form
  async handleSubmit(event) {
    event.preventDefault()

    await this.toggleSubmitting()

    await this.updateStateWithEncryption()

    await this.createPaste()
  }

  async createPaste() {
    const uri = uuidv4()

    const body = {
      uri: uri,
      title: this.state[PASTE_TITLE_ID],
      content: this.state[PASTE_CONTENT_ID],
      ttlDays: parseInt(this.state[PASTE_TTL_ID])
    }

    fetch('/api/create', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      window.location.replace('/paste/' + uri)
    })
  }

  async updateStateWithEncryption() {
    const localState = Object.assign({}, this.state)

    if (localState[PASTE_ENCRYPTION_KEY_ID] !== undefined) {
      const encyrptedContent = this.encryptContent(
        localState[PASTE_CONTENT_ID],
        localState[PASTE_ENCRYPTION_KEY_ID]
      )

      localState[PASTE_CONTENT_ID] = encyrptedContent
    }

    await customSetState(this, localState)
  }

  // handles change events of the text inputs
  handleTextInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  // handles change events of the radio buttons
  handleRadioChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // toggles the submitting state key
  toggleSubmitting() {
    const isSubmitting = this.state.submitting
    const newState = { submitting: !isSubmitting }

    return customSetState(this, newState)
  }

  // encrypts any content with a key
  encryptContent(content, encryptionKey) {
    const cryptr = new Cryptr(encryptionKey)

    return cryptr.encrypt(content)
  }

  render() {
    return (
      <div>
        <PasteJumbotron>
          <h1>Save Your Pastes!</h1>
          <p>This is a basic site for saving text online to retrieve later.</p>
        </PasteJumbotron>
        <Container fluid className="inputPageContainer">
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId={PASTE_TITLE_ID}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Optional"
                  onChange={this.handleTextInputChange}
                />
              </Form.Group>
              <Form.Group controlId={PASTE_CONTENT_ID}>
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  onChange={this.handleTextInputChange}
                />
              </Form.Group>
              <Form.Group controlId={PASTE_ENCRYPTION_KEY_ID}>
                <Form.Label>
                  For private pastes, we can password protect your content!
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Optional"
                  onChange={this.handleTextInputChange}
                />
                <Form.Text className="text-muted">
                  We'll never save your encryption key, or store the original
                  content if a key is present
                </Form.Text>
              </Form.Group>

              <Form.Group
                controlId={PASTE_TTL_ID}
                onChange={this.handleRadioChange}
              >
                <Form.Label>How long do you want us to save it for?</Form.Label>
                <Form.Check
                  type="radio"
                  label="1 Day"
                  name={PASTE_TTL_ID}
                  value={1}
                  id="pasteTimeToLive1"
                  defaultChecked
                />
                <Form.Check
                  type="radio"
                  label="30 Days"
                  name={PASTE_TTL_ID}
                  value={30}
                  id="pasteTimeToLive2"
                />
                <Form.Check
                  type="radio"
                  label="300 Days"
                  name={PASTE_TTL_ID}
                  value={300}
                  id="pasteTimeToLive3"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={this.state.submitting}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Container>
      </div>
    )
  }
}

export default InputPage
