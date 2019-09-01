import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import ReactGA from 'react-ga'

import '../../node_modules/grommet-css'
import App from 'grommet/components/App'
import Box from 'grommet/components/Box'

import * as actions from '../actions'
import Header from '../containers/Header'
import Footer from '../containers/Footer'
import Status from './Status'
import Home from './Home'

class _App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initiated: false,
      deployed: true
    }
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      if (!window.GA_INITIALIZED) {
        this.initGA()
        window.GA_INITIALIZED = true
      }
      this.logPageView()
    }

    this.props.initWeb3()

    setInterval(() => {
      this.props.fetchAccount(this.props.web3)
    }, 2000)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.web3 !== nextProps.web3) {
      this.props.fetchAccount(this.props.web3)
      this.props.initIPFS(this.props.web3)

      this.setState({
        initiated: true
      })

      if (nextProps.web3.web3Initiated) {
        this.props.initToken(nextProps.web3)
      }
    }

    if (this.props.account !== nextProps.account && typeof nextProps.account === 'string') {
      this.setState({
        initiated: true
      })
    }

    if (this.props.Token !== nextProps.Token) {
      nextProps.Token.deployed()
        .then(() => {
          this.setState({
            deployed: true
          })
        })
        .catch((err) => {
          console.log(err)
          this.setState({
            deployed: false
          })
        })
    }
  }

  initGA () {
    ReactGA.initialize(process.env.GA_TRACKING_ID)
    // console.log('Initialized')
  }

  logPageView () {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
    // console.log(`Logged: ${window.location.pathname}`)
  }

  render() {
    return (
      <App>
        <div>
          <BrowserRouter>
            <div>
              <Box align='center' responsive={true} pad='large'>
                <Status
                  account={this.props.account}
                  metamask={this.props.web3}
                  initiated={this.state.initiated}
                  deployed={this.state.deployed} {...this.props} />
                <Box align='center' responsive={true} pad='medium'>
                  <Header />
                </Box>

                { this.state.deployed && typeof this.props.account === 'string' && this.props.account !== 'empty'
                  ? <div>
                      <Route exact path='/home' component={Home} />
                    </div>
                  : null
                }
              </Box>
              <Footer />
            </div>
          </BrowserRouter>
        </div>
      </App>
    )
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3,
    ipfs: state.ipfs,
    account: state.account
  }
}

export default connect(mapStateToProps, actions)(_App)
