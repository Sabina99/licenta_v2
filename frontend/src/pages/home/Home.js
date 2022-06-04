import './Home.scss';
import Menu from "../../common/menu/Menu";
import CustomSearch from "../../common/customSearch/CustomSearch";
import React, { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import VirtualScroll from "react-dynamic-virtual-scroll";
import {useDispatch, useSelector} from "react-redux";
import {getAllMovies, saveComment, likeMovie} from "../../actions/movies";
import {API_BASE_URL} from "../../env";
import {Input} from "antd";
import AddCommentIcon from '@mui/icons-material/AddComment';

function Home() {
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true)
  const {movies} = useSelector((state) => state.movies);
  const [message, setMessage] = useState({});
  const [movie, setMovie] = useState();
  const dispatch = useDispatch();

  if (!movies) {
    dispatch(getAllMovies());
  }

  const onChange = (a, movie) => {
    setMessage({...message, [movie.id]: a.target.value})
    setMovie(movie.id)
  }

  const submitMessage = (e, movieId) => {
    if (e.key === 'Enter' && message[movieId]) {
      dispatch(saveComment(movie, message[movieId]))
        .then(() => dispatch(getAllMovies()))
        .then(() => setMessage({...message, [movieId]: ''}))
        .then(() => scrollToBottom())
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      const commentsElement = document.getElementsByClassName("commentsList");
      if (commentsElement) {
        for (let i = 0; i < commentsElement.length; i++) {
          commentsElement[i].scrollTop = commentsElement[i].scrollHeight;
        }
      }
    }, 1)
  }

  const onLikeMovie = (movie, status) => {
    dispatch(likeMovie(movie.id, status))
      .then(() => dispatch(getAllMovies()))
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
    const el = movies[indexMovie]['comments'][index];

    return (
      <div key={index} className="comment-item">
        <div className="user-image" style={{backgroundImage: `url(${API_BASE_URL.replace('/api', '') + el.user.image})`}}></div>
        <div className="comment-wrapper">
          <div className="user-name">{el.user.name}</div>
          <div className="comment">{el.comment}</div>
        </div>
      </div>
    )
  }

  if (shouldScrollToBottom) {
    scrollToBottom();
    setShouldScrollToBottom(false)
  }

  return (
    <div className="home-container">
      <Menu/>
      <div className="home-wrapper">
        <CustomSearch
          onChange={(el) => console.log('s', el)}
          placeholder="Search movie or user"
        />

        <div>
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
