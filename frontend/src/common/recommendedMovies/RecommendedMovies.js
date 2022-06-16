import './RecommendedMovies.scss';
import {getAllMovies, getMovies} from "../../actions/movies";
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
import log from "tailwindcss/lib/util/log";

function RecommendedMovies(props) {

  const [selected, setSelected] = useState(1);
  const [recommendedOne, setRecommendedOne] = useState([]);
  const [recommendedOTwo, setRecommendedTwo] = useState([]);
  const [recommendedOThree, setRecommendedThree] = useState([]);

  const { value, index } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {movies} = useSelector((state) => state.movies);
  const {recommendations} = useSelector((state) => state.recommended);
  const {friends} = useSelector((state) => state.friends);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  if (!friends) {
    dispatch(getFriends())
  }
  if (!recommendations.length) {
    dispatch(getRecommended([12])).then(res => console.log(res));
  }


  useEffect(() => {
    setFilteredFriends(friends);
  }, [friends])

  const handleMyRatings = () => {
    setSelected(1);
    dispatch(getAllMovies())
  }

  const handleFriendsRatings = () => {
    setSelected(2);
  }

  const handleAllRatings = () => {
    setSelected(3);
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
                My ratings
              </div>
              <div className="button" onClick={handleFriendsRatings} style={getStyle(2)}>
                Friends' ratings
              </div>
              <div className="button" onClick={handleAllRatings} style={getStyle(3)}>
                My & my friends' ratings
              </div>
            </div>
          )}
        </div>
      </div>
      {
        friends && selected === 2 || selected === 3 ?
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
              </div> : null}
          </div> : null
      }
    </div>
  );
}

export default RecommendedMovies;