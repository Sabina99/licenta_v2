import './MovieModal.scss';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, {useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {getAllMovies, likeMovie, saveComment} from "../../actions/movies";
import {useDispatch, useSelector} from "react-redux";
import {getMovie, changeRating, getRating} from "../../actions/movie";
import {Rating} from "@mui/material";
import VirtualScroll from "react-dynamic-virtual-scroll";
import {Input} from "antd";
import AddCommentIcon from "@mui/icons-material/AddComment";
import {API_BASE_URL} from "../../env";

function MovieModal(props) {

  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [message, setMessage] = useState({});

  const movieDetails = useSelector((state) => state.movie);

  const closeModal = () => {
    props.setShouldClear(true);
    props.setMovie(null);
    props.setIsModalVisible(false);
  }

  useEffect(() => {
    if (movieDetails && movieDetails.movie) {
      setMovie(movieDetails.movie);
      setRating(movieDetails.movie.rating);
    }
  }, [movieDetails]);

  if (!movie) {
    // setMovie(props.searchedMovie);
  }

  const dispatch = useDispatch();
  const onLikeMovie = (movie, status) => {
    dispatch(likeMovie(movie.id, status))
      .then(() => {
        dispatch(getMovie(movie.id));
      })
  }

  const onChangeRating = (rating) => {
    if (!rating.target.value) {
      return;
    }

    setRating(rating.target.value);

    dispatch(changeRating(movie.id, rating.target.value))
      .then(() => {
        dispatch(getMovie(movie.id));
      })
  }

  const renderComment = (index) => {
    const el = movie.comments[index];

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

  const onChange = (a, movie) => {
    setMessage({...message, [movie.id]: a.target.value})
    setMovie(movie)
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

  return (
    movie ? <Modal
      open={props.isModalVisible}
      onClose={closeModal}
    >
      <Box className="movie-modal">
        <CloseIcon className="close-modal" onClick={closeModal} />
        <div className="movie-modal-content">
          <div style={{  height: "100%", width: "45%"}}>
            <div className="movie-poster" style={{backgroundImage: `url(${API_BASE_URL.replace('/api', '') + movie.image_src})`}} />
          </div>
          <div className="movie-details">
            <div className="movie-details-title">
              {movie.title + " (" + movie.year + ")"}
            </div>
            {!showComments ?
              <div className="movie-details-content">
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <div className="rating">
                    IMDb rating: {movie.imdb_rating}/10
                  </div>
                  <div className="likes-wrapper">
                    <div className={"likes " + (movie.liked === 1 ? 'active' : '')}
                         onClick={() => onLikeMovie(movie, 1)}>
                      {movie.likes} <ThumbUpIcon/>
                    </div>
                    <div className={"likes " + (movie.liked === 0 ? 'active' : '')}
                         onClick={() => onLikeMovie(movie, 0)}>
                      {movie.dislikes} <ThumbDownAltIcon/>
                    </div>
                  </div>
                </div>
                <div className="movie-starts">
                  Stars: &nbsp;
                  {movie.actors ? movie.actors.slice(0, 3).map((el, index) => {
                      if (index === 2 || index === movie.actors.length - 1) {
                        return (el.name)
                      } else {
                        return (el.name + ", ")
                      }
                    }
                  ) : null}
                </div>
                <div className="movie-plot">
                  {movie.plot ?? null}
                </div>
                <div className="movie-rating">
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    Rate this movie:
                    <Rating className="give-rating" name="no-value" value={rating} onClick={onChangeRating}/>
                  </div>
                </div>
                <div className="movie-show-comments" onClick={() => setShowComments(true)}>
                  Show comments
                </div>
              </div> :
                <>
                  <div className="movie-show-comments"  onClick={() => setShowComments(false)}>
                    Hide comments
                  </div>
                  <div className="comments">
                    {
                      movie.comments &&
                      <VirtualScroll
                        className="commentsList"
                        minItemHeight={60}
                        totalLength={movie.comments.length}
                        renderItem={(rowIndex) => renderComment(rowIndex)}
                      />
                    }
                    <div className="input-wrapper">
                      <Input
                        onChange={(e) => onChange(e, movie)}
                        type="text"
                        value={message[movie.id]}
                        className="input"
                        prefix={<AddCommentIcon/>}
                        onKeyDown={(e) => submitMessage(e, movie.id)}
                      />
                    </div>
                  </div>
                </>
            }
          </div>

        </div>
      </Box>
    </Modal> : null
  );
}

export default MovieModal;
