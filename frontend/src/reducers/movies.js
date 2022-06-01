import {GET_MOVIES_SUCCESS} from "../types/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: payload,
      };
    default:
      return state;
  }
}