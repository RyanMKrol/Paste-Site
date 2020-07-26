import React, { Component } from 'react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

import Cryptr from 'cryptr'

import './OutputPage.css'

class OutputPage extends Component {
  // encrypts any content with a key
  encryptContent(content, encryptionKey) {
    const cryptr = new Cryptr(encryptionKey)

    return cryptr.encrypt(content)
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
            <Card bg={'secondary'} text={'light'}>
              <Card.Header>Header</Card.Header>
              <Card.Body>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    )
  }
}

export default OutputPage
