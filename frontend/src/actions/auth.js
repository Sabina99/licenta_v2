import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_MESSAGE,
  REFRESH_USER_SUCCESS,
} from "../types/types";

import instance from "../plugins/axios";
import {handleError} from "./common";

export const register = (formData) => (dispatch) => {
  return instance
    .post('/register', formData)
    .then(
    (response) => {
      dispatch({ type: REGISTER_SUCCESS });
      dispatch({ type: SET_MESSAGE, payload: response.data.message });

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};

export const login = (formData) => (dispatch) => {
  return instance
    .post('/login', formData)
    .then((response) => {
      if (response?.data?.authorisation.token) {
        localStorage.setItem("token", response?.data?.authorisation.token);
      }

      dispatch({ type: LOGIN_SUCCESS, payload: { user: response?.data } });

      return response?.data;
    }, (error) =>  handleError(error, dispatch))
};

export const logout = () => (dispatch) => {

  return instance.post('/logout').then(
    (response) => {
      localStorage.removeItem("token");

      dispatch({ type: LOGOUT });

      dispatch({ type: SET_MESSAGE, payload: response.data.message });

      return Promise.resolve();
    },
    (error) => handleError(error, dispatch)
  );
};

export const getUser = () => (dispatch) => {
  return instance
    .post('/refresh')
    .then((response) => {
      if (response?.data?.authorisation.token) {
        localStorage.setItem("token", response?.data?.authorisation.token);
      }

      dispatch({ type: REFRESH_USER_SUCCESS, payload: { user: response?.data } });

      return response?.data;
    }, (error) =>  handleError(error, dispatch))
};