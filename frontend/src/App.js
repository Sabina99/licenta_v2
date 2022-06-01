import './App.scss';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "./common/routes";
import {useNavigate} from "react-router-dom";

function App() {
  const isLoggedIn = true;
  window.navigate = useNavigate()

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
