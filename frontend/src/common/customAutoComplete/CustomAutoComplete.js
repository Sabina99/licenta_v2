import './CustomAutoComplete.scss';

import {AutoComplete} from "antd";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import {getAllMovies} from "../../actions/movies";
import {useDispatch} from "react-redux";
const { Option } = AutoComplete;

const CustomAutoComplete = () => {
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  const onSearch = (searchText) => {
    dispatch(getAllMovies('?name=' + searchText))
      .then((movies) => setOptions(movies));
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  return <div className="autocomplete-wrapper" style={{position: 'relative'}}>
    <AutoComplete
      onSelect={onSelect}
      onSearch={onSearch}
      placeholder="Search movie"
      className="input"
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

export default CustomAutoComplete;