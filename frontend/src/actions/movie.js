import instance from "../plugins/axios";
import {GET_MOVIE_SUCCESS} from "../types/types";
import {handleError} from "./common";

export const getMovie = (id) => (dispatch) => {

  return instance.get('/movies/' + id).then(
    (response) => {
      dispatch({ type: GET_MOVIE_SUCCESS , payload: response?.data});

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};

export const changeRating = (movieId, rating) => (dispatch) => {

  return instance.post('/rating', {movieId, rating}).then(
    (response) => {
      // dispatch({ type: GET_MOVIE_SUCCESS , payload: response?.data});

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};