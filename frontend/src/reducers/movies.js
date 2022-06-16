import {
  GET_MOVIES_SUCCESS,
  GET_CHUNK_MOVIES_SUCCESS,
  RESET_MOVIES_CHUNK,
  GET_POPULAR_MOVIES_SUCCESS
} from "../types/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: payload,
      };
    case GET_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        movies: payload,
      };
    case GET_CHUNK_MOVIES_SUCCESS:
      let chunkMovies = state.chunkMovies || [];
      let newChunk = payload.filter((el) => !chunkMovies.find((movie) => movie.id === el.id))

      return {
        ...state,
        chunkMovies: [
          ...chunkMovies,
          ...newChunk
        ]
      };
    case RESET_MOVIES_CHUNK:
      return {
        ...state,
        chunkMovies: []
      }
    default:
      return state;
  }
}