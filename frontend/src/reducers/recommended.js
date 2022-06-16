import {CLEAR_FILTER, GET_RECOMMENDED_SUCCESS} from "../types/types";

const initialState = {
  recommendations: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECOMMENDED_SUCCESS:
      return {
        ...state,
        recommendations: payload,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        recommendations: [],
      };
    default:
      return state;
  }
}