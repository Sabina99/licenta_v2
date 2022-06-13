import './FollowingTab.scss'
import {API_BASE_URL} from "../../env";
import React from "react";
import {useNavigate} from "react-router-dom";

function FollowingTab(props) {
  const navigate = useNavigate();

  return <div className="following-tab">
    {props.users.map((el) => {
      let backgroundImage = API_BASE_URL.replace('/api', '') + el.image;
      if (!el.image) {
        backgroundImage = "../../../images/default-profile-picture.jpg"
      }

      let lastLikedMovie = el.user_movies.filter((el) => el.is_liked === 1).sort((a, b) => a.updated_at < b.updated_at ? 1 : -1)[0];
      let lastDislikedMovie = el.user_movies.filter((el) => el.is_liked === 0).sort((a, b) => a.updated_at < b.updated_at ? 1 : -1)[0];

      return (
        <div key={el.id} className="user-wrapper">
          <div className="user">
            <div className="profile-image" style={{backgroundImage: `url(${backgroundImage})`}} />
            <div className="name-wrapper">
              <div className="name">{el.name}  ({el.age})</div>
              <div className="followed-by">Followed by: {el.following?.length} people</div>
            </div>
          </div>
          <div className="description">{el.description}</div>

          <div className="last-liked-movie">Last liked movie: {lastLikedMovie?.movie.title}</div>
          <div className="last-disliked-movie">Last disliked movie: {lastDislikedMovie?.movie.title}</div>

          <div className="more-details" onClick={() => {
            navigate('/friend-profile/' + el.id)
            props.changeUser()
          }}>See more details</div>
        </div>
      )
    })}
  </div>
}

export default FollowingTab;