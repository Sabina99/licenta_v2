import instance from "../plugins/axios";
import {GET_FRIENDS_RATINGS_SUCCESS, GET_RECOMMENDED_SUCCESS} from "../types/types";
import {handleError} from "./common";

export const getRecommended = (data) => (dispatch) => {

  return instance.post('/recommendations', data).then(
    (response) => {
      if (data.type === 'friends-ratings') {
        dispatch({ type: GET_FRIENDS_RATINGS_SUCCESS , payload: response?.data});
      } else {
        dispatch({ type: GET_RECOMMENDED_SUCCESS , payload: response?.data});
      }

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};