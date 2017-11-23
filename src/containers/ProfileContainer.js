import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Alert,
  Share,
  Platform,
  BackHandler
} from 'react-native'
import InfoGroup from '../components/InfoGroup'
import ContactGroup from '../components/ContactGroup'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { removeToken, setUserInfo, fetchInfo } from '../actions/UserActions'
import { connect } from 'react-redux'
const FBSDK = require('react-native-fbsdk')

const { ShareDialog } = FBSDK

class ProfileContainer extends Component {
  state = {
    isFetched: false
  }

  confirmLogout = () => {
    if (this.props.userState.token.type == 'google') {
      GoogleSignin.signOut()
        .then(() => {
          console.log('out')
        })
        .catch(err => {})
    }
    let { dispatch } = this.props
    dispatch(removeToken())
    dispatch(setUserInfo({}))
    this.props.navigation.goBack()
  }

  logOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Sign Out', onPress: () => this.confirmLogout() }
      ],
      { cancelable: false }
    )
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    return true
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    let { dispatch } = this.props
    dispatch(fetchInfo())
  }

  shareToFacebook = () => {
    let url = 'http://teko.vn/home/'
    let shareLinkContent = {
      contentType: 'link',
      contentUrl: 'http://teko.vn/home/',
      contentDescription: 'Wow, check out this great site!'
    }
    ShareDialog.canShow(shareLinkContent)
      .then(function(canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent)
        }
      })
      .then(
        function(result) {
          if (result.isCancelled) {
            console.log('Share cancelled')
          } else {
            console.log('Share success with postId: ' + result.postId)
          }
        },
        function(error) {
          console.log('Share fail with error: ' + error)
        }
      )
  }
  render() {
    if (this.props.userState.data.name == null) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <InfoGroup data={this.props.userState.data} />
        <ContactGroup data={this.props.userState.data} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.button]}
          onPress={() => this.shareToFacebook()}
        >
          <Ionicons name="ios-share" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', top: 30, left: 20 }}
          onPress={() => this.logOut()}
        >
          <Ionicons
            name="ios-log-out-outline"
            size={30}
            color="#ffffff"
            style={{ backgroundColor: 'transparent' }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  button: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e9e9e9'
  }
})

const mapStateToProps = state => ({
  userState: state.userState
})
export default connect(mapStateToProps)(ProfileContainer)
