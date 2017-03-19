
let defaultState = {
  authenticated: false,
  username: undefined,
  email: undefined,
  image: undefined,
  displayName: 'Christian Andersson'
}

const auth = (state = defaultState, { type, payload}) => {
  switch (type) {
    case 'AUTH_INIT':
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        authenticated:true,
        username: payload.uid,
        email: payload.email,
        image: payload.photoUrl
      }
    case 'SIGN_OUT_SUCCESS':
      return defaultState
    case 'CREATE_USER_FAIL':
      return state;
    default:
      return state;
  }
}

export default auth;
