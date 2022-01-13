import {
  LOG_OUT,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_REGISTER,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
} from "../ActionTypes/userActionsTypes.js";

const initialState = {
  loading: false,
  currentUser: null,
  errors: null,
  isAuth: false,
  err:false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN:
      return {
        ...state,
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: payload,
      };

    case USER_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        errors: payload,
        err:true,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        errors: payload,
        err:true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        msg: payload,
      };

    case LOG_OUT:
      return {
        ...state,
        isAuth: false,
      };

    default:
      return state;
  }
};

export default userReducer;
