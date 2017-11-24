import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Platform,
  Share,
  ActivityIndicator,
  Alert
} from 'react-native'
// import { Facebook, Google } from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { setAccessToken } from '../actions/UserActions'
import { DumbData } from '../helpers/DumbData'
const FBSDK = require('react-native-fbsdk')
const { LoginManager, AccessToken } = FBSDK
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
class LoginContainer extends Component {
  state = {
    isSingingIn: false,
    telephone: '',
    password: ''
  }

  loginFacebook = () => {
    let { dispatch } = this.props
    let _this = this
    this.setState({
      isSingingIn: true
    })
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          _this.setState({
            isSingingIn: false
          })
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            let accessToken = {
              type: 'facebook',
              value: data.accessToken.toString()
            }
            dispatch(setAccessToken(accessToken))
            _this.props.navigation.navigate('Profile')

            _this.setState({
              isSingingIn: false
            })
          })
        }
      },
      function(error) {
        _this.setState({
          isSingingIn: false
        })
      }
    )
  }

  _setupGoogleSignin = async () => {
    try {
      await GoogleSignin.configure({
        iosClientId:
          '680412008840-qv61mb192nsf6va9003go7leff406vbj.apps.googleusercontent.com'
      })

      const user = await GoogleSignin.currentUserAsync()
    } catch (err) {
      console.log('Google signin error', err.code, err.message)
    }
  }

  signInWithGoogleAsync = () => {
    let _this = this
    let { dispatch } = this.props
    this.setState({
      isSingingIn: true
    })
    GoogleSignin.signIn()
      .then(user => {
        let accessToken = { type: 'google', value: user.accessToken }
        dispatch(setAccessToken(accessToken))
        _this.props.navigation.navigate('Profile')
        this.setState({
          isSingingIn: false
        })
      })
      .catch(err => {
        console.log('WRONG SIGNIN', err)
        this.setState({
          isSingingIn: false
        })
      })
      .done()
  }

  loginLocal = () => {
    this.setState({
      isSingingIn: true
    })
    this.validateLocalLogin()
  }

  validateLocalLogin = () => {
    let { dispatch } = this.props
    let localData = DumbData
    if (
      this.state.password == localData.signInInfo.password &&
      this.state.telephone == localData.signInInfo.id
    ) {
      let accessToken = localData.accessToken
      dispatch(setAccessToken(accessToken))
      this.props.navigation.navigate('Profile')
      this.setState({
        isSingingIn: false
      })
    } else {
      Alert.alert(
        'Incorrect Password',
        'Telephone: 123456 Password: 123456',
        [
          {
            text: 'OK',
            onPress: () => {
              this.setState({
                isSingingIn: false
              })
            }
          }
        ],
        { cancelable: false }
      )
    }
  }

  componentDidMount() {
    this._setupGoogleSignin()
    if (this.props.userState.token.type != null) {
      setTimeout(() => {
        this.props.navigation.navigate('Profile')
      }, 500)
    }
  }

  render() {
    if (
      this.props.userState.token.type != null ||
      this.state.isSingingIn == true
    ) {
      return (
        <ImageBackground
          style={styles.container}
          source={require('../assets/background.jpg')}
        >
          <ActivityIndicator animating={true} />
        </ImageBackground>
      )
    }
    return (
      <ImageBackground
        style={styles.container}
        source={require('../assets/background.jpg')}
      >
        <Ionicons
          name="ios-camera"
          size={100}
          color="#ffffff"
          style={{ marginBottom: 10 }}
        />
        <View>
          <View
            style={[
              styles.inputContainer,
              {
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                borderBottomColor: '#e6e6e6',
                borderBottomWidth: 1
              }
            ]}
          >
            <Ionicons name="ios-mail-outline" size={30} color="#898989" />
            <TextInput
              placeholder={'E-mail Address'}
              onChangeText={telephone => this.setState({ telephone })}
              underlineColorAndroid={'transparent'}
              keyboardType={'phone-pad'}
              style={[
                styles.input,
                {
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3
                }
              ]}
            />
          </View>
          <View
            style={[
              styles.inputContainer,
              { borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }
            ]}
          >
            <Ionicons
              name="ios-lock-outline"
              size={30}
              color="#898989"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              underlineColorAndroid={'transparent'}
              style={[
                styles.input,
                { borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }
              ]}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.button,
              styles.centerButton,
              { backgroundColor: '#f9671e' }
            ]}
            onPress={() => this.loginLocal()}
          >
            <Text style={styles.buttonLabel}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.socialGroup}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.button,
              styles.socialButton,
              { backgroundColor: '#3c5a98' }
            ]}
            onPress={() => this.loginFacebook()}
          >
            <Ionicons
              name="logo-facebook"
              size={22}
              color="#ffffff"
              style={{ marginRight: 15 }}
            />

            <Text style={styles.buttonLabel}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.button,
              styles.socialButton,
              { backgroundColor: '#d34836' }
            ]}
            onPress={() => this.signInWithGoogleAsync()}
          >
            <Ionicons
              name="logo-googleplus"
              size={22}
              color="#ffffff"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.buttonLabel}>Sign in with Google</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: 275,
              justifyContent: 'space-between',
              marginTop: 35
            }}
          >
            <TouchableOpacity activeOpacity={0.9}>
              <Text style={{ color: '#a2aab5' }}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9}>
              <Text style={{ color: '#a2aab5' }}>New here? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  inputContainer: {
    flexDirection: 'row',
    width: 275,
    backgroundColor: '#ffffff',
    padding: 10,
    paddingHorizontal: 15,
    position: 'relative',
    height: 50
  },
  input: {
    flex: 1,
    marginLeft: 15,
    paddingVertical: 3
  },
  button: {
    flexDirection: 'row',
    height: 50,
    width: 275,
    flexDirection: 'row',
    marginTop: 15,
    borderRadius: 3,
    alignItems: 'center'
  },
  buttonLabel: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight: '500'
  },
  centerButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialButton: {
    paddingLeft: 50
  },
  socialGroup: {
    marginTop: 30
  }
})

const mapStateToProps = state => ({
  userState: state.userState
})

export default connect(mapStateToProps)(LoginContainer)
