import React, { Component } from 'react'
import { connect } from 'react-redux'
import Web3Utils from 'web3-utils'

import Toast from 'grommet/components/Toast'
import Heading from 'grommet/components/Heading'
import Box from 'grommet/components/Box'
import TextInput from 'grommet/components/TextInput'
import Button from 'grommet/components/Button'
import Label  from 'grommet/components/Label'
import Form  from 'grommet/components/Form'

class Donate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amountEth: '',
      success: '',
      failure: '',
      rate: null,
      modalOpen: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      amountEth: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.Token.deployed().then((token) => {
      if (this.state.amountEth > 0 && Web3Utils.isAddress(this.props.account)) {
        this.props.web3.web3.eth.sendTransaction({
          from: this.props.account,
          to: token.address,
          value:  this.props.web3.web3.toWei(this.state.amountEth, 'ether'),
          gas: 300000,
          data: '0x00'
        }, (err, receipt) => {
          if (!err) {
            this.setState({
              modalOpen: true,
              success: `Success! Your tx: ${receipt}`
            })
          } else {
            this.setState({
              modalOpen: true,
              failure: `Error occured: ${err.message}`
            })
          }
        })
      } else {
        this.setState({
          modalOpen: true,
          failure: `Minimum donation is more than 0.`
        })
      }
    })

  }

  render() {
    return (
      <Box>
        <Heading>Donate</Heading>
        <Box align='center'>
          <Form onSubmit={this.handleSubmit}>
            <Box pad='small' align='center'>
              <Label labelFor="amountInput">Your Contribution:</Label>
            </Box>
            <Box pad='small' align='center'>
              <TextInput id='amountInput'
                type='number'
                step='0.01'
                onDOMChange={this.handleChange}
                value={this.state.amountEth}
                placeHolder='Amount to buy' />
              <Label>
                { this.state.amountEth > 0 ? `${this.state.amountEth} ETH = ` : '' }
                { this.state.amountTokens > 0 ? `${this.state.amountTokens} PWP` : '' }
              </Label>
            </Box>
            <Box pad='small' align='center'>
              <Button primary={true} type='submit' label='Buy tokens' />
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
    web3: state.web3
  }
}

export default connect(mapStateToProps)(Donate)
