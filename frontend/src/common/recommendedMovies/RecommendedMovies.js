import './RecommendedMovies.scss';
import {useDispatch, useSelector} from "react-redux";
import {getFriends} from "../../actions/friends";
import {getRecommended} from "../../actions/recommended";
import VirtualScroll from "react-dynamic-virtual-scroll";
import {API_BASE_URL} from "../../env";
import {Checkbox, OutlinedInput} from "@mui/material";
import CustomSearch from "../customSearch/CustomSearch";
import React, {useState, useEffect} from "react";
import {cloneDeep} from "lodash/lang";
import {useNavigate} from "react-router-dom";
import MovieModal from "../modals/MovieModal";
import {getMovie} from "../../actions/movie";
import {CLEAR_FILTER} from "../../types/types";
import ClearIcon from '@mui/icons-material/Clear';

function RecommendedMovies(props) {

  const [selected, setSelected] = useState(1);
  const [fetchedRecommended, setFetchedRecommended] = useState(false);

  const { value, index } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {recommendations} = useSelector((state) => state.recommended);
  const {friends} = useSelector((state) => state.friends);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [movie, setMovie] = useState(null);

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  if (!friends) {
    dispatch(getFriends())
  }

  if (!recommendations.length && !fetchedRecommended) {
    setFetchedRecommended(true)
    dispatch(getRecommended({type: 'my-preferences'}))
      // .then(() => clearFilter())
  }

  useEffect(() => {
    setFilteredFriends(friends);
  }, [friends])

  const applyFilter = () => {
    dispatch(getRecommended({type: 'friends-ratings', users: selectedFriends.map((el) => el.id)}))
  }

  const handleMyRatings = () => {
    setSelected(1);
    dispatch(getRecommended({type: 'my-preferences'}))
  }

  const handleFriendsRatings = () => {
    clearFilter()
    setSelected(2);
  }


  const getStyle = (index) => {
    if (selected !== index) {
      return null;
    }
    return {opacity: "0.5", color: "#edbd28", outline: "#edbd28 solid 1px"}
  }

  const handleChange = (event, el, isChosen = false) => {
    let chosenFriends = [];
    if (event.target.checked) {
      setSelectedFriends([...selectedFriends, el]);
      setFilteredFriends(cloneDeep(filteredFriends).filter(friend => friend.id !== el.id));
    } else {
      chosenFriends = cloneDeep(selectedFriends).filter(friend => friend.id !== el.id);
      setSelectedFriends(chosenFriends);
    }

    if (isChosen) {
      setFilteredFriends(cloneDeep(friends).filter(friend => !chosenFriends.find(el => el.id === friend.id)));
    }
  };

  const renderItems = (index, checked = false) => {
    const el = checked ? selectedFriends[index] : filteredFriends[index];
    let backgroundImage = API_BASE_URL.replace('/api', '') + el.follow.image;
    if (!el.follow.image) {
      backgroundImage = "../../../images/default-profile-picture.jpg"
    }

    return (
      <div key={index} className="choose-row-item">
        <div className="user-image" style={{backgroundImage: `url(${backgroundImage})`}}></div>
        <div className="friend-container">
          <div className="friend-details">
            <div className="name-wrapper">
              <div className="name">{el.follow.name}</div>
              {el.follow.age && <span style={{marginLeft: "12px"}}>({el.follow.age})</span>}
            </div>
            <div className="followed-by">Followed by: {el.follow.followers.length} people</div>
            <div className="more-details" onClick={() => navigate('/friend-profile/' + el.follow.id)}>See more details</div>
          </div>
          <Checkbox {...label} checked={checked} onChange={(e) => handleChange(e, el, checked)}/>
        </div>
      </div>
    )
  }

  const onChange = (name) => {
    let searchFriends = cloneDeep(friends).filter((friend) => !selectedFriends.find(el => el.id === friend.id))

    if (name) {
      searchFriends = cloneDeep(searchFriends).filter((el) => el.follow.name.toLowerCase().includes(name));
    }

    setFilteredFriends(searchFriends)
  }


  const showModal = (movie) => {
    dispatch(getMovie(movie.id)).then(() => setIsModalVisible(true))
  }

  const closeModal = () => {
    setMovie(null);
    setIsModalVisible(false);
  }

  return (
    <div className="recommended-container">
      <div className="recommended-wrapper">
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          {value === index && (
            <div className="recommended-buttons">
              <div className="buttons-label">
                Based on:
              </div>
              <div className="button" onClick={handleMyRatings} style={getStyle(1)}>
                My recommendations
              </div>
              <div className="button" onClick={handleFriendsRatings} style={getStyle(2)}>
                Friends' ratings
              </div>
            </div>
          )}
        </div>
      </div>
      {
        (selected === 1 || selected === 2) &&
        <div className="my-preferences">
          {recommendations.map((movie) => (
            <div key={movie.id} className="row-item" onClick={() => showModal(movie)}>
              <img src={API_BASE_URL.replace('/api', '') + movie.image_src} className="movie-image" loading="auto" alt="..."/>

              <div className="title-wrapper">
                <div className="title">
                  {movie.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      }
      <MovieModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        movie={movie}
        setMovie={setMovie}
        setShouldClear={closeModal}
      />

      {
        friends && selected === 2 && !recommendations.length ?
          <div className="recommended-container-wrapper">
            <div className="choose-friends-container">
              <div className="choose-title">
                Choose friends
              </div>
              <CustomSearch onChange={onChange} placeholder="Search"/>
              <VirtualScroll
                className="List"
                minItemHeight={20}
                totalLength={filteredFriends.length}
                renderItem={(rowIndex) => renderItems(rowIndex)}
                style={{height: "100%", overflow: 'auto'}}
              />
            </div>
            { selectedFriends.length ?
              <div className="chosen-friends-container">
                <div className="chosen-title">
                  Chosen friends
                </div>
                <VirtualScroll
                  className="List"
                  minItemHeight={20}
                  totalLength={selectedFriends.length}
                  renderItem={(rowIndex) => renderItems(rowIndex, true)}
                  style={{height: "100%", overflow: 'auto'}}
                />
                <div className="submit-wrapper">
                  <div className="apply" onClick={applyFilter}>Apply</div>
                </div>
              </div> : null}
          </div> : null
      }

      {
        selected === 2 && recommendations.length &&
        <div className={"close-wrapper"} onClick={clearFilter}>
          <ClearIcon/>
        </div>
      }
    </div>
  );
}

export default RecommendedMovies;