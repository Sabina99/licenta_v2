import {GET_FRIEND_SUCCESS, GET_FRIENDS_SUCCESS} from "../types/types";

const initialState = {
  friends: null,
  friend: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: payload,
      };
    case GET_FRIEND_SUCCESS:
      return {
        ...state,
        friend: payload,
      };
    default:
      return state;
  }
}