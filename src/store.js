import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { UserReducer } from './reducers/'
import storage from 'redux-persist/es/storage'
const config = {
  key: 'root', // key is required
  storage, // storage is now required
  whitelist: ['userState'],
  debug: true
}

let reducers = {
  userState: UserReducer
}

const reducer = persistCombineReducers(config, reducers)

function configureStore() {
  let store = createStore(reducer, applyMiddleware(thunk))
  let persistor = persistStore(store)

  return { persistor, store }
}
export default configureStore
