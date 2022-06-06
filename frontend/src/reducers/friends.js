import {GET_FRIENDS_SUCCESS} from "../types/types";

const initialState = {
  friends: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: payload,
      };
    default:
      return state;
  }
}