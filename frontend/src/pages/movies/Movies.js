import './Movies.scss';
import Menu from "../../common/menu/Menu";
import {Button, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import CustomSearch from "../../common/customSearch/CustomSearch";
import React, {useState} from "react";
import {getAllMovies} from "../../actions/movies";
import VirtualScroll from "react-dynamic-virtual-scroll";

function Movies() {
  const {movies} = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  if (!movies) {
    dispatch(getAllMovies());
  }

  const onFilter = () => {
    console.log("filter")
  }

  const onSort = () => {
    console.log("sort")
  }

  const onReset = () => {
    console.log("reset")
  }

  const renderItems = (index) => {
    const el = movies[index];

    return (
      <div key={index} className="row-item">
      <div className="movie-image" style={{backgroundImage: `url(${el.image})`}}></div>
        <div className="title-wrapper">
          <div className="title">
            {el.title}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="movies-container">
      <Menu/>
        <div className="movies-wrapper">
          {movies ?
            <div>
              <div className="header">
                <CustomSearch
                  onChange={(el) => console.log('s', el)}
                  placeholder="Search movie or user"
                />
                <div className="filter-buttons">
                  <Button className="button" onClick={onFilter}>Filter by</Button>
                  <Button className="button" onClick={onSort}>Sort by</Button>
                  <Button className="button" onClick={onReset}>Reset filters</Button>
                </div>
              </div>
              <div className="body">
                {movies &&
                  <VirtualScroll
                    className="List"
                    minItemHeight={500}
                    totalLength={20}
                    renderItem={(rowIndex) => renderItems(rowIndex)}
                    style={{height: "calc(100vh - 95px)", overflow: 'auto'}}
                  />
                }
              </div>
            </div>: null
          }
        </div>
    </div>
  );
}

export default Movies;
