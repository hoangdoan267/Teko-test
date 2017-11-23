/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { View } from 'react-native'
import LoginContainer from './containers/LoginContainer'
import ProfileContainer from './containers/ProfileContainer'
import { connect } from 'react-redux'

class Router extends Component {
  renderRouter = () => {
    let Route = StackNavigator(
      {
        Login: { screen: LoginContainer },
        Profile: {
          screen: ProfileContainer,
          navigationOptions: {
            gesturesEnabled: false
          }
        }
      },
      {
        headerMode: 'none',
        initialRouteName: 'Login'
      }
    )
    return <Route />
  }

  render() {
    return this.renderRouter()
  }
}

// const mapStateToProps = state => ({
//   userState: state.userState
// })
export default Router
