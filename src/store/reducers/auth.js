import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  authenticated: false,
  signin: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        authenticated: false,
      };
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        signin: true,
      };
    case actionTypes.AUTH_SIGNUP_FAILED:
      return { ...state, loading: false };
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false,
        authenticated: true,
      };
    case actionTypes.AUTH_LOGIN_FAILED:
      return { ...state, loading: false };
    case actionTypes.AUTH_LOGOUT:
      return { ...state, authenticated: false, token: null, userId: null };
    case actionTypes.TOGGLE_AUTH_PAGE:
      return { ...state, signin: !state.signin };
    default:
      return state;
  }
};

export default authReducer;
