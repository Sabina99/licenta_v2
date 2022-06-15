import './Movies.scss';
import Menu from "../../common/menu/Menu";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import CustomSearch from "../../common/customSearch/CustomSearch";
import React, {useState, useEffect} from "react";
import {getMovies} from "../../actions/movies";
import MovieModal from "../../common/modals/MovieModal";
import {getMovie} from "../../actions/movie";
import InfiniteScroll from "react-infinite-scroll-component";
import {API_BASE_URL} from "../../env";

function Movies() {
  const {chunkMovies} = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [batchNumber, setBatchNumber] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const movieDetails = useSelector((state) => state.movie);

  useEffect(() => {
    if (movieDetails && movieDetails.movie) {
      setMovie(movieDetails.movie);
    }
  }, [movieDetails]);

  if (!chunkMovies.length) {
    dispatch(getMovies(40));
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

  const showModal = (movie) => {
    dispatch(getMovie(movie.id));
    setIsModalVisible(true);
  }

  const closeModal = () => {
    setMovie(null);
    setIsModalVisible(false);
  }

  const renderItems = (movie) => {

    return (
      <div key={movie.id} className="row-item" onClick={() => showModal(movie)}>
        {/*<LazyLoadImage*/}
        {/*  effect="blur"*/}
        {/*  // src={API_BASE_URL.replace('/api', '') + movie.image_src}*/}
        {/*  src={`http://localhost:3000/${movie.image_src.replace('storage/', '')}`}*/}
        {/*  className="movie-image"*/}
        {/*  width={170}*/}
        {/*  height={257}*/}
        {/*/>*/}
        <img src={API_BASE_URL.replace('/api', '') + movie.image_src} className="movie-image" loading="auto" alt="..."/>

        <div className="title-wrapper">
          <div className="title">
            {movie.title}
          </div>
        </div>
      </div>
    )
  }

  const fetchMoreData = () => {
    dispatch(getMovies(40, batchNumber))
      .then(() => setBatchNumber(batchNumber + 1));
  };

  let chunkSize = 5;
  if (window.outerWidth < 950) {
    chunkSize = 2
  }
  if (window.outerWidth < 1000) {
    chunkSize = 3
  }
  if (window.outerWidth < 1200) {
    chunkSize = 4
  }
  if (window.outerWidth < 1400) {
    chunkSize = 5
  }

  let chunks = [];
  for (let i = 0; i < chunkMovies?.length; i += chunkSize) {
    chunks.push(chunkMovies.slice(i, i + chunkSize));
  }

  return (
    <div className="movies-container">
      <Menu/>
        <div className="movies-wrapper">
          <MovieModal  isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} movie={movie} setMovie={setMovie} setShouldClear={closeModal}/>
          {chunkMovies ?
            <div>
              <div className="header">
                <CustomSearch
                  onChange={(el) => console.log('s', el)}
                  placeholder="Search movie"
                />
                <div className="filter-buttons">
                  <Button className="button" onClick={onFilter}>Filter by</Button>
                  <Button className="button" onClick={onSort}>Sort by</Button>
                  <Button className="button" onClick={onReset}>Reset filters</Button>
                </div>
              </div>
              <div className="body">
                <div
                  id="scrollableList"
                  className="List"
                >
                  <InfiniteScroll
                    dataLength={chunks.length}
                    next={fetchMoreData}
                    hasMore={true}
                    scrollableTarget="scrollableList"
                  >
                    {chunks.map((chunk) => (
                      <div style={{display: 'flex'}}>
                        { chunk.map((movie) => (renderItems(movie))) }
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </div>
            </div>: null
          }
        </div>
    </div>
  );
}

export default Movies;
