import './Movies.scss';
import Menu from "../../common/menu/Menu";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import React, {useState, useEffect} from "react";
import {getMovies} from "../../actions/movies";
import MovieModal from "../../common/modals/MovieModal";
import {getMovie} from "../../actions/movie";
import InfiniteScroll from "react-infinite-scroll-component";
import {API_BASE_URL} from "../../env";
import AutoComplete from "../../common/customAutoComplete/CustomAutoComplete";
import {PuffLoader} from "react-spinners";

function Movies() {
  const {chunkMovies} = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [batchNumber, setBatchNumber] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const movieDetails = useSelector((state) => state.movie);
  const [shouldClear, setShouldClear] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMovies, setLoadMovies] = useState(false);

  useEffect(() => {
    if (movieDetails && movieDetails.movie) {
      setMovie(movieDetails.movie);
    }
  }, [movieDetails]);

  if (!chunkMovies.length && !loadMovies) {
    setLoading(true);
    setTimeout(fn => setLoading(false), 500)
    dispatch(getMovies(40));
    setLoadMovies(true)
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
    dispatch(getMovie(movie.id)).then(() => setIsModalVisible(true))
  }

  const closeModal = () => {
    setMovie(null);
    setIsModalVisible(false);
  }

  const renderItems = (movie) => {

    return (
      <div key={movie.id} className="row-item" onClick={() => showModal(movie)}>
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

  const setMovieHandler = (movie) => {
    setMovie(movie)
    dispatch(getMovie(movie.id)).then(() => setIsModalVisible(true))
  }

  return (
    <div className="movies-container">
      <Menu/>
        <div className="movies-wrapper">
          <MovieModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            movie={movie}
            setMovie={setMovie}
            setShouldClear={closeModal}
          />
          {chunkMovies ?
            <div>
              <div className="header">
                <AutoComplete
                  shouldClear={shouldClear}
                  setIsModalVisible={setIsModalVisible}
                  setMovie={setMovieHandler}
                  movie={movie}
                />
              </div>
              <div className="body">
                <div className="fake-loader" style={{display: loading ? 'flex' : 'none'}}>
                  <PuffLoader color='#EDBD28' loading={loading} size={100} />
                </div>

                <div
                  id="scrollableList"
                  className="List"
                >
                  <InfiniteScroll
                    dataLength={chunkMovies.length}
                    next={fetchMoreData}
                    hasMore={true}
                    scrollableTarget="scrollableList"
                  >
                      { chunkMovies.map((movie) => (renderItems(movie))) }
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
