import { combineReducers } from 'redux'
import InitWeb3Reducer from './init_web3'
import InitTokenReducer from './init_token'
import FetchAccountReducer from './fetch_account'
import IPFSReducer from './init_ipfs'

const rootReducer = combineReducers({
  web3: InitWeb3Reducer,
  Token: InitTokenReducer,
  ipfs: IPFSReducer,
  account: FetchAccountReducer
})

export default rootReducer
