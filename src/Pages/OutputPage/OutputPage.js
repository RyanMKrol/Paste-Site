import React, { Component } from 'react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

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
