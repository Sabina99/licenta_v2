import './Friends.scss';
import Menu from "../../common/menu/Menu";
import AutoComplete from "../../common/friendsAutoComplete/FriendsAutoComplete";
import {useDispatch, useSelector} from "react-redux";
import {getFriends, removeFriend} from "../../actions/friends";
import {API_BASE_URL} from "../../env";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {getUser} from "../../actions/auth";
import React from "react";
import {useNavigate} from "react-router-dom";

function Friends() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {friends} = useSelector((state) => state.friends);

  if (!friends) {
    dispatch(getFriends())
  }

  const onRemoveFriend = (id) => {
    dispatch(removeFriend(id))
      .then(() => dispatch(getFriends()))
      .then(() => dispatch(getUser()))
  }

  const renderFriendsList = () => friends?.map(({follow}) => {
    let backgroundImage = API_BASE_URL.replace('/api', '') + follow.image;
    if (!follow.image) {
      backgroundImage = "../../../images/default-profile-picture.jpg"
    }

    return (
      <div className="item">
        <div className="profile-image" style={{backgroundImage: `url(${backgroundImage})`}} onClick={() => navigate('/friend-profile/' + follow.id)}></div>
        <div className="details-wrapper">
          <div className="details" onClick={() => navigate('/friend-profile/' + follow.id)}>
            <div className="name">{follow.name}</div>
            <div className="sub-name">Followed by: {follow.followers.length} people</div>
          </div>
          <div className="close-btn" onClick={() => onRemoveFriend(follow.id)}><PersonRemoveIcon/></div>
        </div>
      </div>
    )
  })

  return (
    <div className="friends-container">
      <Menu/>
      <div className="friends-wrapper">
        <AutoComplete />

        <div className="friends-list List">
          { renderFriendsList() }
        </div>
      </div>
    </div>
  );
}

export default Friends;
