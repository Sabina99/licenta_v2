import './ChooseMovie.scss';
import {useDispatch, useSelector} from "react-redux";
import {getCommonMovie} from "../../actions/commonMovie";
import {API_BASE_URL} from "../../env";
import {useState} from "react";
import {getMovie} from "../../actions/movie";

function ChooseMovie(props) {

  const { value, index } = props;

  const dispatch = useDispatch();

  const {movie} = useSelector((state) => state.commonMovie);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!movie) {
    dispatch(getCommonMovie({
      ids: [
        255, 249, 183, 212
      ]
    }))
  }

  const showModal = (movie) => {
    dispatch(getMovie(movie.id)).then(() => setIsModalVisible(true))
  }

  const closeModal = () => {
    // setMovie(null);
    setIsModalVisible(false);
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
          {value === index && (
            <div>
              {movie ?
                <div className="choose-movie-item" onClick={() => showModal(movie)}>
                  <img src={API_BASE_URL.replace('/api', '') + movie.image_src} className="movie-image" loading="auto" alt="..."/>

                  <div className="choose-movie-title-wrapper">
                     <div className="title">
                       {movie.title + (movie.year ? " (" + movie.year + ")" : "")}
                    </div>
                  </div>
                  <div className="movie-details-content">
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                      <div className="rating">
                        IMDb rating: {movie.imdb_rating}/10
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
                  </div>
                </div>
                : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChooseMovie;