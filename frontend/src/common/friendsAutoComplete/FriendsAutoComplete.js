import './FriendsAutoComplete.scss';

import {AutoComplete} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getUsers} from "../../actions/auth";
const { Option } = AutoComplete;

const FriendsAutoComplete = (props) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const onSearch = (searchText) => {
    setValue(searchText);
    dispatch(getUsers('?name=' + searchText))
      .then((users) => setOptions(users));
  };


  const onSelect = (data) => {
    setValue(data);
    dispatch(getUsers())
      .then((movies) => {
        props.setMovie(movies.find(movie => movie.title === data));
        props.setIsModalVisible(true);
      });
  };

  useEffect(() => {
    if (!props.movie) {
      setValue('');
    }
  }, [props.movie]);

  return <div className="autocomplete-wrapper" style={{position: 'relative'}}>
    <AutoComplete
      onSelect={onSelect}
      onSearch={onSearch}
      placeholder="Search movie"
      className="input"
      value={value}
    >
      {options.map((el) => (
        <Option key={el.id} value={el.title}>
          <div className="image" style={{backgroundImage: `url(${el.image})`}}></div>
          <div className="option-wrapper">
            <span style={{fontWeight: 600, fontSize: 18}}>{el.title}</span>
            <span>{el.genres}</span>
          </div>
        </Option>
      ))}

    </AutoComplete>
  </div>
}

export default FriendsAutoComplete;