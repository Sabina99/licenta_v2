import './Menu.scss';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TheatersIcon from '@mui/icons-material/Theaters';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {login, logout} from "../../actions/auth";
import {useDispatch} from "react-redux";

const itemClass = (location, nextPage = null) => {
  let className = 'item';

  if (nextPage === '/') {
    nextPage = '';
  }

  if (location.pathname.replace('/', '') === nextPage) {
    className += ' active';
  }

  return className;
}



const Menu = () => {
  const l = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logout()).then(() => navigate('/login'));
  }

  return (
    <div className="menu-wrapper">
      <div className="profile">
        <div className="profile-image"></div>
        <div className="name">Sabina Apostol</div>
        <div className="username">@sabinas</div>
      </div>
      <div className="followers">
        <div className="section">
          <GroupIcon style={{color: '#B1BBBB'}}/>
          <div className="follow">
            <div className="color-gray">645</div>
            <div className="color-gray">followers</div>
          </div>
        </div>
        <div className="section">
          <GroupIcon style={{color: '#B1BBBB'}}/>
          <div className="follow">
            <div className="color-gray">365</div>
            <div className="color-gray">following</div>
          </div>
        </div>
      </div>

      <div className="menu">
        <Link className={itemClass(l, '/')} to="/"><HomeIcon /> Home </Link>
        <Link className={itemClass(l, 'movies')} to="/movies"><MovieIcon /> Movies </Link>
        <Link className={itemClass(l, 'must-watch')} to="/must-watch"><TheatersIcon /> Must Watch </Link>
        <Link className={itemClass(l, 'friends')} to="/friends"><PeopleIcon /> Friends </Link>
        <Link className={itemClass(l, 'profile')} to="/profile"><AccountCircleIcon /> Profile </Link>
      </div>

      <div className="button-wrapper">
        <div onClick={onLogOut} className="button">Log out</div>
      </div>
    </div>
  );
}

export default Menu;