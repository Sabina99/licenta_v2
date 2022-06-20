import Movies from "../pages/movies/Movies";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Friends from "../pages/friends/Friends";
import FriendProfile from "../pages/friendProfile/FriendProfile";
import MustWatch from "../pages/must-watch/MustWatch";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";

export const routes = [
  {
    path: "/login",
    name: "login",
    element: Login,
    private: false,
  },
  {
    path: "/register",
    name: "register",
    element: Register,
    private: false,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    element: ForgotPassword,
    private: false,
  },
  {
    path: "/",
    name: "home",
    element: Home,
    private: true,
  },
  {
    path: "/movies",
    name: "movies",
    element: Movies,
    private: true,
  },
  {
    path: "/profile",
    name: "profile",
    element: Profile,
    private: true,
  },
  {
    path: "/friends",
    name: "friends",
    element: Friends,
    private: true,
  },
  {
    path: "/friend-profile/:id",
    name: "friendProfile",
    element: FriendProfile,
    private: true,
  },
  {
    path: "/must-watch",
    name: "must-watch",
    element: MustWatch,
    private: true,
  }

];
