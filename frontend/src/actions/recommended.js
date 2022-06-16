import instance from "../plugins/axios";
import {GET_RECOMMENDED_SUCCESS} from "../types/types";
import {handleError} from "./common";

export const getRecommended = (data) => (dispatch) => {

  return instance.post('/recommendations', data).then(
    (response) => {
      dispatch({ type: GET_RECOMMENDED_SUCCESS , payload: response?.data});

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};