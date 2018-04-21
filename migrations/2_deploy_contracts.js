require('babel-register')
require('babel-polyfill')
const chalk = require('chalk')
const prod = false
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const Token = artifacts.require('./PowerPiperToken.sol')

module.exports = function(deployer, network, accounts) {
  const _wallet = prod ? "0xe37b36b9705ebcc53d242b62b1a2fab971dcea02" : accounts[0]

  return deployer
    .then(() => {
      return deployer.deploy(
        Token, { from: _wallet, gas: 6712390, gasPrice: web3.toWei(4, 'gwei') }
      )
    })
    .then(async () => {
      const token = await Token.deployed()
      console.log(`Token address: ${chalk.green(token.address)}`)
    })

}
