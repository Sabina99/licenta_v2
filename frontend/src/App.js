import './App.scss';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "./common/routes";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./actions/auth";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = true;
  window.navigate = useNavigate()

  const {user} = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  if (!user && token) {
    dispatch(getUser())
  }

  return (
    <div className="app-container">
      <Routes>
        {routes
          .map((route, index) =>
            route.private && !isLoggedIn ?
              <Route
                key={index}
                path={route.path}
                element={<Navigate to="/login" replace/>}
              /> :
              <Route
                key={index}
                path={route.path}
                element={<route.element/>}/>
          )
        }
      </Routes>
    </div>
  );
}

export default App;
