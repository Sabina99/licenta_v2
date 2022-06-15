import {combineReducers} from "redux";
import auth from "./auth";
import movies from "./movies";
import movie from "./movie";
import friends from "./friends";
import recommended from "./recommended";

export default combineReducers({
  auth,
  movies,
  movie,
  friends,
  recommended
})