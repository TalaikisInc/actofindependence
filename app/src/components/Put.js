import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Web3Utils from 'web3-utils'

import Toast from 'grommet/components/Toast'
import Heading from 'grommet/components/Heading'
import Box from 'grommet/components/Box'
import TextInput from 'grommet/components/TextInput'
import Button from 'grommet/components/Button'
import List from 'grommet/components/List'
import ListItem  from 'grommet/components/ListItem'
import Label  from 'grommet/components/Label'
import Form  from 'grommet/components/Form'

class Put extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hash: '',
      success: '',
      failure: '',
      modalOpen: false,
      document: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUploadFile = this.handleUploadFile.bind(this)
  }

  handleUploadFile(event) {
    const data = event.target.files[0]
    const name = event.target.name
    if (data.type.match('image/*')) {
      const reader = new FileReader()
      reader.onload = (function(theFile) {
        return function(e) {
          this.setState({
            [name]: e.target.result
          })
        }.bind(this)
    }.bind(this))(data)
    reader.readAsDataURL(data)
    } else {
      this.setState({
        modalOpen: true,
        failure: `We can accept only image files.`
      })
    }
  }

  handleChange(event) {
    const value = event.target.value ? event.target.value : event.option.value
    
    this.setState({
      [event.target.name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const _data = JSON.stringify({ document: this.state.document })

    this.props.ipfs.addJSON(_data, async (err, _hash) => {
      if (err) {
        this.setState({
          failure: `Error occured: ${err.message}`
        })
      } else {
        this.setState({
          modalOpen: true,
          hash: _hash,
          success: `Success! Your hash: ${_hash}`
        })
      }
    })
  }

  render() {
    return (
      <Box>
        <Heading>Upload image to Interplanetary File System (IPFS)</Heading>
        <Box align='center'>
          <Form onSubmit={this.handleSubmit}>
            <Box pad='small' align='center'>
              <Label>Please attach your image:</Label>
              <input id='file' name='document' type='file' onChange={this.handleUploadFile} />
            </Box>
          </Form>
        </Box>
          { this.state.modalOpen && <Toast
            status={this.state.success ? 'ok' : 'critical' }>
              <p>{ this.state.success ? this.state.success : null }</p>
              <p>{ this.state.failure ? this.state.failure : null }</p>
            </Toast>
          }
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    Token: state.Token,
    account: state.account,
    web3: state.web3,
    ipfs: state.ipfs
  }
}

export default connect(mapStateToProps)(Put)
