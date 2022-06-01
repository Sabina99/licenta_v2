import './Movies.scss';
import Menu from "../../common/menu/Menu";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import CustomSearch from "../../common/customSearch/CustomSearch";
import React, {useState} from "react";

import {getAllMovies} from "../../actions/movies";

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

  return (
    <div className="movies-container">
      <Menu/>
        <div className="movies-wrapper">
          {movies ?
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
            </div> : null
          }
        </div>
    </div>
  );
}

export default Movies;
