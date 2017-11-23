import * as types from '../actions/ActionTypes'

const initialState = {
  token: {},
  data: {}
}
const UserReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.SET_ACCESS_TOKEN:
      return {
        ...state,
        token: payload
      }
      break
    case types.REMOVE_TOKEN:
      return {
        ...state,
        token: {}
      }
      break

    case types.SET_USER_INFO:
      return {
        ...state,
        data: payload
      }
      break

    default:
      return state
  }
}

export default UserReducer
