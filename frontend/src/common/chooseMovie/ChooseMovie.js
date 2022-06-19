import './ChooseMovie.scss';
import {useDispatch, useSelector} from "react-redux";
import {getCommonMovie} from "../../actions/commonMovie";
import {API_BASE_URL} from "../../env";
import React, {useState, useEffect} from "react";

function ChooseMovie(props) {

  const { value, index } = props;

  const dispatch = useDispatch();
  const [fetchMovie, shouldFetchMovie] = useState(true);
  const {movie} = useSelector((state) => state.commonMovie);

  if (fetchMovie) {
    dispatch(getCommonMovie())
    shouldFetchMovie(false)
  }

  return (
    <div className="choose-movie-container">
      <div className="choose-movie-wrapper">
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          {value === index && movie && (
            <div className="choose-movie-item">
              <div className="image" >
                <div className="movie-image" style={{backgroundImage: `url(${API_BASE_URL.replace('/api', '') + movie.image_src})`}} />
              </div>
              <div className="content">
                <div className="title">
                  {movie.title + (movie.year ? " (" + movie.year + ")" : "")}
                </div>

                <div className="genders">
                  {movie.genres.split(',').slice(0, 2).map((el) => <span className={el.toLowerCase()}>{el}</span>)}
                </div>
                <div className="movie-details-content">
                  <div className="movie-plot">
                    {movie.plot ?? null}
                  </div>

                  <div className="rating">
                    <span>IMDb rating:</span>{movie.imdb_rating}/10
                  </div>

                  <div className="director">
                    <span>Director:</span>{movie.directors}
                  </div>

                  <div className="movie-starts">
                    <span>Top stars</span>
                    <div className="actors">
                      {movie.actors?.filter((el) => el.image).slice(0, 5).map((el) => (
                        <div className="actor">
                          <div className="image" style={{backgroundImage: `url(${el.image})`}}></div>
                          <div className="name">{el.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChooseMovie;