import {combineReducers} from "redux";
import auth from "./auth";
import movies from "./movies";
import movie from "./movie";

export default combineReducers({
  auth,
  movies,
  movie
})