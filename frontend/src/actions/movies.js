import instance from "../plugins/axios";
import {handleError} from "./common";
import {GET_MOVIES_SUCCESS} from "../types/types";

export const getAllMovies = () => (dispatch) => {

  return instance.get('/movies').then(
    (response) => {

      dispatch({ type: GET_MOVIES_SUCCESS , payload: response?.data});
      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};
