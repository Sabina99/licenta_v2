import instance from "../plugins/axios";
import {handleError} from "./common";
import {GET_POPULAR_MOVIES_SUCCESS} from "../types/types";

export const getPopularMovies = (take, batch = 0) => (dispatch) => {
  return instance.get('/popularMovies').then(
    (response) => {

      dispatch({ type: GET_POPULAR_MOVIES_SUCCESS , payload: response?.data});

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
}