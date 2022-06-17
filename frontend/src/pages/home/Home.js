import './Home.scss';
import Menu from "../../common/menu/Menu";
import AutoComplete from "../../common/customAutoComplete/CustomAutoComplete";
import React, { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import VirtualScroll from "react-dynamic-virtual-scroll";
import {useDispatch, useSelector} from "react-redux";
import {saveComment, likeMovie} from "../../actions/movies";
import {getPopularMovies} from "../../actions/popularMovies";
import {API_BASE_URL} from "../../env";
import {Input} from "antd";
import AddCommentIcon from '@mui/icons-material/AddComment';
import MovieModal from "../../common/modals/MovieModal";
import {getMovie} from "../../actions/movie";

function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shouldClear, setShouldClear] = useState(false);
  const {movies} = useSelector((state) => state.popularMovies);
  const [message, setMessage] = useState({});
  const [movie, setMovie] = useState();
  const dispatch = useDispatch();

  if (!movies) {
    dispatch(getPopularMovies());
  }

  const onChange = (a, movie) => {
    setMessage({...message, [movie.id]: a.target.value})
  }

  const setMovieHandler = (movie) => {
    setMovie(movie)
    dispatch(getMovie(movie.id)).then(() => setIsModalVisible(true))
  }

  const submitMessage = (e, movieId) => {
    if (e.key === 'Enter' && message[movieId]) {
      dispatch(saveComment(movieId, message[movieId]))
        .then(() => setMessage({...message, [movieId]: ''}))
        .then(() => dispatch(getPopularMovies(movies.map((el) => el.id))))
    }
  }

  const onLikeMovie = (movie, status) => {
    dispatch(likeMovie(movie.id, status))
      .then(() => dispatch(getPopularMovies(movies.map((el) => el.id))))
  }

  const renderItems = (index) => {
    const el = movies[index];

    return (
      <div key={index} className="row-item">
        <div className="movie-image" style={{backgroundImage: `url(${el.image})`}}></div>
        <div className="movie-comments">
          <div className="title-wrapper">
            <div className="title">
              {el.title}
            </div>
            <div className="likes-wrapper">
              <div className={"likes " + (el.liked === 1 ? 'active' : '')} onClick={() => onLikeMovie(movies[index], 1)}>
                {el.likes} <ThumbUpIcon />
              </div>
              <div className={"likes " + (el.liked === 0 ? 'active' : '')} onClick={() => onLikeMovie(movies[index], 0)}>
                {el.dislikes} <ThumbDownAltIcon />
              </div>
            </div>
          </div>
          <div className="comments">
            {
              movies[index]['comments'] &&
              <VirtualScroll
                className="commentsList"
                minItemHeight={60}
                totalLength={movies[index]['comments'].length}
                renderItem={(rowIndex) => renderComment(rowIndex, index)}
              />
            }
            <div className="input-wrapper">
              <Input
                onChange={(e) => onChange(e, movies[index])}
                type="text"
                value={message[movies[index].id]}
                className="input"
                prefix={<AddCommentIcon />}
                onKeyDown={(e) => submitMessage(e, movies[index].id)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderComment = (index, indexMovie) => {
    const el = movies[indexMovie]['comments'][movies[indexMovie]['comments'].length - 1 - index];
    let backgroundImage = API_BASE_URL.replace('/api', '') + el.user.image;
    if (!el.user.image) {
      backgroundImage = "../../../images/default-profile-picture.jpg"
    }

    return (
      <div key={index} className="comment-item">
        <div className="user-image" style={{backgroundImage: `url(${backgroundImage})`}}></div>
        <div className="comment-wrapper">
          <div className="user-name">{el.user.name}</div>
          <div className="comment">{el.comment}</div>
        </div>
      </div>
    )
  }

  if (shouldClear) {
    setShouldClear(false);
  }
  const closeModal = () => {
    setMovie(null);
    setIsModalVisible(false);
  }

  return (
    <div className="home-container">
      <Menu/>
      <div className="home-wrapper">
        <AutoComplete
          shouldClear={shouldClear}
          setIsModalVisible={setIsModalVisible}
          setMovie={setMovieHandler}
          movie={movie}
        />
        <div>
          <MovieModal
            isModalVisible={isModalVisible}
            setShouldClear={closeModal}
            setIsModalVisible={setIsModalVisible}
            movie={movie}
            setMovie={setMovie}
          />
          {
            movies &&
            <VirtualScroll
              className="List"
              minItemHeight={500}
              totalLength={20}
              renderItem={(rowIndex) => renderItems(rowIndex)}
              style={{height: "calc(100vh - 95px)", overflow: 'auto'}}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
