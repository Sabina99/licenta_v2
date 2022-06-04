import instance from "../plugins/axios";
import {handleError} from "./common";
import {GET_MOVIES_SUCCESS} from "../types/types";

export const getAllMovies = (params = null) => (dispatch) => {

  return instance.get('/movies' + (params || '')).then(
    (response) => {

      if (!params) {
        dispatch({ type: GET_MOVIES_SUCCESS , payload: response?.data});
      }

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};

export const saveComment = (movieId, comment) => (dispatch) => {
  return instance.post('/comments/' + movieId, {comment}).then(
    (response) => {

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};

export const likeMovie = (movieId, status) => (dispatch) => {
  return instance.post('/movies/' + movieId + '/' + status).then(
    (response) => {

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};
