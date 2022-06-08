import './FriendProfile.scss';
import Menu from "../../common/menu/Menu";
import { useParams } from "react-router-dom";
import {getFriend, getUser} from "../../actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {API_BASE_URL} from "../../env";
import React, {useEffect, useState} from "react";
import {addFriend, getFriends, removeFriend} from "../../actions/friends";

function FriendProfile() {
  const [friend, setFriend] = useState();

  const [isFriend, setIsFriend] = useState(null);
  const [status, setStatus] = useState('Follow');
  const { id } = useParams();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const loggedUser = user?.user;

  useEffect(() => {
    if (!friend) {
      dispatch(getFriend(id))
        .then((friend) => setFriend(friend));
    }

    if (isFriend !== true && isFriend !== false && friend && loggedUser) {
      setIsFriend(!!friend.followers.find(user => user.id === loggedUser.id));
    }

    setStatus(isFriend ? 'Following' : 'Follow')
  }, [friend, loggedUser, isFriend]);


  let backgroundImage = API_BASE_URL.replace('/api', '') + friend?.image;
  if (!friend?.image) {
    backgroundImage = "../../../images/default-profile-picture.jpg"
  }

  const onAddFriend = () => {
    let event = addFriend;
    if (isFriend) {
      event = removeFriend;
    }

    setIsFriend(!isFriend)
    dispatch(event(friend.id))
      .then(() => dispatch(getFriends()))
      .then(() => dispatch(getUser()))
  }

  const onMouseOver = () => {
    if (status === 'Following') {
      setStatus('Unfollow');
    }
  }

  const onMouseOut = () => {
    if (status === 'Unfollow' && isFriend) {
      setStatus('Following');
    }
  }

  return (
    <div className="friend-profile-container">
      <Menu/>
      {
        friend &&
        <div className="friend-profile-wrapper">
          <div className="cover-image">
          </div>
          <div className="friend-profile-content">
            <div className="profile-details-wrapper">
              <div className="profile-image" style={{backgroundImage: `url(${backgroundImage})`}}></div>
              <div className="details">
                <div className="name-wrapper">
                  <div className="name">{friend.name} ({friend.age})</div>
                  <div className="followers">2,003 <span>followers</span></div>
                </div>
                <div
                  className={"follow " + (isFriend ? 'active' : '')}
                  onClick={onAddFriend}
                  onMouseEnter={onMouseOver}
                  onMouseLeave={onMouseOut}
                >
                  {status}
                </div>
              </div>
            </div>

            <div className="description">
              {friend.description}
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default FriendProfile;
