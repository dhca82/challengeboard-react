const auth = (state = { authenticated: false }, { type, payload}) => {
  switch (type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        authenticated:true,
        username: payload
      }
    case 'SIGN_OUT_SUCCESS':
      return {
        ...state,
        authenticated:false,
        username: null
      }
    case 'CREATE_USER_FAIL':
      return state;
    default:
      return state;
  }
}

export default auth;
