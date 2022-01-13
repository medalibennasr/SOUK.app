/********* *******************    User register action creator ********************************** */

import axios from "axios";
import {
  LOG_OUT,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_REGISTER,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
} from "../ActionTypes/userActionsTypes";

export const userRegiter = (payload) => async (dispatch) => {
  dispatch({ type: USER_REGISTER });

  try {
    const res = await axios.post("/api/auth/register", payload);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data.msg });
  } catch (error) {
    console.log("register error", error);
    dispatch({ type: USER_REGISTER_FAILED, payload: error.res.data.msg });
  }
};

/********* *******************    User Longin action creator ********************************** */
export const userLogin = (userCred) => async (dispatch) => {
  dispatch({ type: USER_LOGIN });

  try {
    const res = await axios.post("/api/auth/login", userCred);
    console.log(res);
    localStorage.setItem("accessToken", res.data.accessToken);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAILED, payload: error.res.data.msg });
  }
};

/*******************************  Log Out ********** */

export const logOut = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
  localStorage.removeItem("accessToken");
};