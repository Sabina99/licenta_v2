import './FriendProfile.scss';
import Menu from "../../common/menu/Menu";
import { useParams } from "react-router-dom";
import {getFriend, getUser} from "../../actions/auth";
import {useDispatch} from "react-redux";
import {API_BASE_URL} from "../../env";
import React, {useEffect, useState} from "react";
import {addFriend, getFriends, removeFriend} from "../../actions/friends";

function FriendProfile() {
  const [isShown, setIsShown] = useState(false);
  const [user, setUser] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getFriend(id))
        .then((user) => setUser(user));
    }
  }, [user]);

  let backgroundImage = API_BASE_URL.replace('/api', '') + user?.image;
  if (!user?.image) {
    backgroundImage = "../../../images/default-profile-picture.jpg"
  }

  const onAddFriend = () => {
    dispatch(addFriend(user.id))
      .then(() => dispatch(getFriends()))
      .then(() => dispatch(getUser()))
  }

  return (
    <div className="friend-profile-container">
      <Menu/>
      {
        user &&
        <div className="friend-profile-wrapper">
          <div className="cover-image">
          </div>
          <div className="friend-profile-content">
            <div className="profile-details-wrapper">
              <div className="profile-image" style={{backgroundImage: `url(${backgroundImage})`}}></div>
              <div className="details">
                <div className="name-wrapper">
                  <div className="name">{user.name} ({user.age})</div>
                  <div className="followers">2,003 <span>followers</span></div>
                </div>
                <div className="follow" onClick={onAddFriend}>Follow</div>
              </div>
            </div>

            <div className="description">
              {user.description}
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default FriendProfile;
