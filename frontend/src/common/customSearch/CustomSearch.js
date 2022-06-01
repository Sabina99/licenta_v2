import './CustomSearch.scss';
import {Input} from "antd";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

const CustomSearch = (props) => {
  const [inputValue, setInputValue] = useState('');

  const onChange = (data) => {
    setInputValue(data.target.value)
    props.onChange(inputValue)
  }

  return <div className="input-wrapper">
    <Input
      placeholder={props.placeholder}
      onChange={(e) => onChange(e)}
      type="text"
      defaultValue={inputValue}
      className="input"
      prefix={<SearchIcon />}
    />
  </div>
}

export default CustomSearch;