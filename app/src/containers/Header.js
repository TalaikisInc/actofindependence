import React, { Component } from 'react'
import { connect } from 'react-redux'

import Box  from 'grommet/components/Box'
import Heading  from 'grommet/components/Heading'

import * as actions from '../actions'

class Header extends Component {
  render () {
    return (
      <Box align="center">
        <Heading align="center">Act of Independence of Lithuania on Ethereum Blockchain</Heading>
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3,
    account: state.account
  }
}

export default connect(mapStateToProps, actions)(Header)
