import {CLEAR_FILTER, GET_FRIENDS_RATINGS_SUCCESS, GET_RECOMMENDED_SUCCESS} from "../types/types";

const initialState = {
  recommendations: [],
  friendsRecommendations: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECOMMENDED_SUCCESS:
      return {
        ...state,
        recommendations: payload,
      };
    case GET_FRIENDS_RATINGS_SUCCESS:
      return {
        ...state,
        friendsRecommendations: payload,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        friendsRecommendations: [],
      };
    default:
      return state;
  }
}