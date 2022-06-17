import {GET_COMMON_MOVIE_SUCCESS} from "../types/types";

const initialState = {
  movie: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMMON_MOVIE_SUCCESS:
      return {
        ...state,
        movie: payload,
      };
    default:
      return state;
  }
}