import * as actiontypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actiontypes.AUTH_START,
  };
};

const signUpSuccess = () => {
  return {
    type: actiontypes.AUTH_SIGNUP_SUCCESS,
  };
};

const signUpFail = () => {
  return {
    type: actiontypes.AUTH_SIGNUP_FAILED,
  };
};

export const loginSuccess = (idToken, localId) => {
  return {
    type: actiontypes.AUTH_LOGIN_SUCCESS,
    payload: { token: idToken, userId: localId },
  };
};

const loginFail = () => {
  return {
    type: actiontypes.AUTH_LOGIN_FAILED,
  };
};

export const signup = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(
        "http://localhost:8080/auth/signup",
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Signup Failed");
        }
        dispatch(signUpSuccess());
      })
      .catch((err) => {
        dispatch(signUpFail());
      });
  };
};

export const signin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(
        "http://localhost:8080/auth/signin",
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Signin Failed");
        }
        localStorage.setItem("token", response.data.idToken.toString());
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem(
          "expirationDate",
          new Date(new Date().getTime() + response.data.expiresIn * 1000)
        );
        dispatch(loginSuccess(response.data.idToken, response.data.localId));
        setTimeout(
          () => dispatch(() => auth_logout()), // By Putting dispatch(auth_logout()), logout function is called immediately.
          response.data.expiresIn * 1000
        ); // Important
      })
      .catch((err) => {
        dispatch(loginFail());
      });
  };
};

export const auth_logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return (dispatch) => {
    dispatch({ type: actiontypes.SET_INGREDIENTS_FAILED });
    dispatch({ type: actiontypes.AUTH_LOGOUT });
  };
};

export const toggleAuth = () => {
  return {
    type: actiontypes.TOGGLE_AUTH_PAGE,
  };
};
