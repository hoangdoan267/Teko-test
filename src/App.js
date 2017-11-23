import React, { Component } from 'react'

import { Provider } from 'react-redux'
import Router from './router'
import { PersistGate } from 'redux-persist/es/integration/react'
const { persistor, store } = configureStore()
import configureStore from './store'
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    )
  }
}
