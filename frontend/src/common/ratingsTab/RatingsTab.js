import MovieModal from "../modals/MovieModal";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMovie} from "../../actions/movie";
import "./RatingsTab.scss";
import {API_BASE_URL} from "../../env";

const ProfileTabs = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [movie, setMovie] = useState(null);
  const movieDetails = useSelector((state) => state.movie);
  const {user: loggedInUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieDetails && movieDetails.movie) {
      setMovie(movieDetails.movie);
    }
  }, [movieDetails]);

  const showModal = (movie) => {
    dispatch(getMovie(movie.id)).then(() => setIsModalVisible(true))
  }

  const closeModal = () => {
    setMovie(null);
    setIsModalVisible(false);
  }

  return (
    <div className="ratings-tab">
      <MovieModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        movie={movie}
        setMovie={setMovie}
        setShouldClear={closeModal}
      />
      {props.movies.map((el, index) => {
        let backgroundImageUrl = el.movie.image;
        if (loggedInUser && loggedInUser.loadImageFromServer) {
          backgroundImageUrl = API_BASE_URL.replace('/api', '') + el.movie.image_src;
        }

        return <div key={el.id + index} className="item">
          <div className="image" style={{backgroundImage: `url(${backgroundImageUrl})`}} />
          <div className="details-wrapper">
            <div className="details">
              <div className="name">{el.movie.title}</div>
              {props.showRating && <div className="rating">Rating: {el.rating}</div>}
              <div className="genders">
                {el.movie.genres.split(',').slice(0, 2).map((el) => <span className={el.toLowerCase()}>{el}</span>)}
              </div>
            </div>
          </div>
        </div>
      })}
    </div>
  )
}

export default ProfileTabs;