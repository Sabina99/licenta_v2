import instance from "../plugins/axios";
import {handleError} from "./common";
import {GET_POPULAR_MOVIES_SUCCESS} from "../types/types";

export const getPopularMovies = (movieIds = null) => (dispatch) => {
  let url = '/popularMovies';
  if (movieIds) {
    url += '?ids=' + movieIds.join(',')
  }

  return instance.get(url).then(
    (response) => {

      dispatch({ type: GET_POPULAR_MOVIES_SUCCESS , payload: response?.data});

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
}