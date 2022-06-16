import {GET_POPULAR_MOVIES_SUCCESS} from "../types/types";

const initialState = {
  movies: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        movies: payload,
      };
    default:
      return state;
  }
}