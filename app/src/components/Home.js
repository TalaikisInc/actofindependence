import React, { Component } from 'react'
import { connect } from 'react-redux'

import Toast from 'grommet/components/Toast'
import Box from 'grommet/components/Box'
import Label from 'grommet/components/Label'
import Image from 'grommet/components/Image'
import web3 from 'web3'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      success: '',
      failure: '',
      modalOpen: false,
      data: '',
      network: ''
    }

    this.getAct = this.getAct.bind(this)
    this.getNetwork = this.getNetwork.bind(this)
  }

  componentDidMount() {
    this.getAct()
    this.getNetwork()
  }

  getNetwork() {
    this.props.web3.web3.version.getNetwork(async (net) => {
      let network
      switch (net) {
        case '1':
          network = 'MainNet'
          break
        case '2':
          network = 'Morden (deprecated)'
          break
        case '3':
          network = 'Ropsten Test Network'
          break
        case '4':
          network = 'Rinkeby Test Network'
          break
        case '42':
          network = 'Kovan Test Network'
          break
        default:
          network = 'Local network'
      }

      this.setState({
        network: network
      })
    })

    setTimeout(() => {
      this.getNetwork()
    }, 2000)
  }

  getAct() {
    this.props.Token.deployed().then(async (token) => {
      if(web3.utils.isAddress(this.props.account)) {
          token.getAct({ from: this.props.account })
            .then(async (res) => {
              this.props.ipfs.catJSON(res, async (err, data) => {
                if(err) {
                  // console.log(err)
                  this.setState({
                    modalOpen: true,
                    failure: `Error occured: ${err.message}`
                  })
                } else {
                  this.setState({
                    data: data
                  })
                }
              })
            })
            .catch((error) => {
              // console.log(error.message)
              this.setState({
                modalOpen: true,
                failure: `Error occured: ${error.message}`
              })
            })
        } else {
          this.setState({
            modalOpen: true,
            failure: 'Wrong account.'
          })
        }
      })

    setTimeout(() => {
      this.getAct()
    }, 5000)
  }

  render() {
    return (
      <Box align="center">
        <Box align="center">
          { this.state.data === '' ?
            <div>
              <Box align="center">
                <Label align="center">Loading...</Label>
              </Box>
              <Box align="center">
                <Label align="center">NOTE. Your Metamask should point to Main Network in order to load The Act</Label>
              </Box>
            </div>
            : <Image src={this.state.data} size='large' />
          }
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

export default connect(mapStateToProps)(Home)
