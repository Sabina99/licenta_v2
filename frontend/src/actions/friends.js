import instance from "../plugins/axios";
import {GET_FRIENDS_SUCCESS, UNFOLLOW_FRIEND} from "../types/types";
import {handleError} from "./common";

export const getFriends = () => (dispatch) => {

  return instance.get('/following').then(
    (response) => {
      dispatch({ type: GET_FRIENDS_SUCCESS , payload: response?.data});

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};

export const removeFriend = (friendId) => (dispatch) => {

  return instance.post('/unfollow/' + friendId).then(
    (response) => {

      dispatch({ type: UNFOLLOW_FRIEND });

      return response?.data;
    },
    (error) => handleError(error, dispatch)
  );
};