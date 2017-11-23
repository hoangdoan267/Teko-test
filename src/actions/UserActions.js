import * as types from './ActionTypes'
import { DumbData } from '../helpers/DumbData'

export const setAccessToken = token => {
  return { type: types.SET_ACCESS_TOKEN, payload: token }
}

export const removeToken = () => {
  return { type: types.REMOVE_TOKEN }
}

const setInfo = payload => {
  return {
    type: types.SET_USER_INFO,
    payload: payload
  }
}

const fetchFacebookData = token => {
  return dispatch => {
    let url =
      'https://graph.facebook.com/v2.11/me?fields=id,name,cover,picture,email&access_token=' +
      token.value
    return fetch(url).then(response => response.json())
  }
}

const fetchGoogle = token => {
  return dispatch => {
    return fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => response.json())
  }
}

export const fetchInfo = () => {
  return (dispatch, getState) => {
    let token = getState().userState.token
    switch (token.type) {
      case 'facebook':
        return dispatch(fetchFacebookData(token)).then(res => {
          let data = {
            name: res.name,
            address: 'Hanoi',
            tel: [
              { type: 'Home', number: 'XXXX-XXXX-XXXX' },
              { type: 'Work', number: 'YYYY-YYYY-YYYY' }
            ],
            email: [
              { type: 'Work', address: 'xyz@teko.vn' },
              { type: 'Home', address: res.email }
            ],
            picture_url:
              'https://graph.facebook.com/' + res.id + '/picture?type=large',
            cover_url: res.cover.source
          }
          return dispatch(setInfo(data))
        })
        break
      case 'google':
        return dispatch(fetchGoogle(token.value)).then(res => {
          let data = {
            name: res.given_name + ' ' + res.family_name,
            address: 'Hanoi',
            tel: [
              { type: 'Home', number: 'XXXX-XXXX-XXXX' },
              { type: 'Work', number: 'YYYY-YYYY-YYYY' }
            ],
            email: [
              { type: 'Work', address: 'xyz@teko.vn' },
              { type: 'Home', address: res.email }
            ],
            picture_url: res.picture,
            cover_url:
              'https://9to5google.files.wordpress.com/2015/08/default_cover_3_b19c82d973ede0bb8981bcf5d52e50de.jpg?quality=82&strip=all&w=640'
          }
          return dispatch(setInfo(data))
        })
      case 'local':
        let data = DumbData.data
        return dispatch(setInfo(data))
      default:
        break
    }
  }
}

export const setUserInfo = payload => {
  return dispatch => {
    return dispatch(setInfo(payload))
  }
}
