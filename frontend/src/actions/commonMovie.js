import instance from "../plugins/axios";
import {GET_COMMON_MOVIE_SUCCESS} from "../types/types";
import {handleError} from "./common";

export const getCommonMovie = (data) => (dispatch) => {

  return instance.post('/commonMovie', data).then(
    (response) => {
      dispatch({ type: GET_COMMON_MOVIE_SUCCESS , payload: response?.data});

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};