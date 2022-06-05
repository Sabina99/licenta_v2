import {GET_MOVIE_SUCCESS} from "../types/types";

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        movie: payload,
      };
    default:
      return state;
  }
}