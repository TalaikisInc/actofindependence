require('babel-register')
require('babel-polyfill')
const HDWalletProvider = require('truffle-hdwallet-provider')

const config = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: 336
    },
    main: {
      host: 'localhost',
      port: 8545,
      network_id: '1',
      from: '0xe37b36b9705ebcc53d242b62b1a2fab971dcea02',
      gas: 6712390
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8545,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
 }
 
module.exports = config
