import './Home.scss';
import Menu from "../../common/menu/Menu";
import CustomSearch from "../../common/customSearch/CustomSearch";
import React, { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import VirtualScroll from "react-dynamic-virtual-scroll";
import {useDispatch, useSelector} from "react-redux";
import {getAllMovies} from "../../actions/movies";
import {API_BASE_URL} from "../../env";
import {Input} from "antd";
import AddCommentIcon from '@mui/icons-material/AddComment';

function Home() {
  let {movies} = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  if (!movies) {
    dispatch(getAllMovies());
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
              <div className="likes">
                {el.likes} <ThumbUpIcon />
              </div>
              <div className="likes">
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
                // placeholder={props.placeholder}
                // onChange={(e) => onChange(e)}
                type="text"
                // defaultValue={inputValue}
                className="input"
                prefix={<AddCommentIcon />}
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
