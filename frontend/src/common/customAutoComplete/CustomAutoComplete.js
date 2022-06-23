import './CustomAutoComplete.scss';

import {AutoComplete} from "antd";
import React, {useEffect, useState} from "react";
import {getAllMovies} from "../../actions/movies";
import {useDispatch, useSelector} from "react-redux";
import {API_BASE_URL} from "../../env";
const { Option } = AutoComplete;

const CustomAutoComplete = (props) => {

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const {user: loggedInUser} = useSelector((state) => state.auth);

  const onSearch = (searchText) => {
    setValue(searchText);
    dispatch(getAllMovies('?name=' + searchText))
      .then((movies) => setOptions(movies));
  };


  const onSelect = (data) => {
    setValue(data);
    dispatch(getAllMovies())
      .then((movies) => {
        props.setMovie(movies.find(movie => movie.title === data));
      });
  };

  useEffect(() => {
    if (!props.movie) {
      setValue('');
    }
  }, [props.movie]);

  return <div className="autocomplete-wrapper">
    <AutoComplete
      onSelect={onSelect}
      onSearch={onSearch}
      placeholder="Search movie"
      className="input"
      value={value}
    >
      {options.map((el) => {
        let backgroundImageUrl = el.image;
        if (loggedInUser && loggedInUser.loadImageFromServer) {
          backgroundImageUrl = API_BASE_URL.replace('/api', '') + el.image_src;
        }

        return <Option key={el.id} value={el.title}>
          <div className="image" style={{backgroundImage: `url(${backgroundImageUrl})`}}></div>
          <div className="option-wrapper">
            <span style={{fontWeight: 600, fontSize: 18}}>{el.title}</span>
            <span>{el.genres}</span>
          </div>
        </Option>
      })}

    </AutoComplete>
  </div>
}

export default CustomAutoComplete;