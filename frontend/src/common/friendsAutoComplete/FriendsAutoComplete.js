import './FriendsAutoComplete.scss';

import {AutoComplete} from "antd";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {getUsers} from "../../actions/auth";
import {API_BASE_URL} from "../../env";
import {useNavigate} from "react-router-dom";
const { Option } = AutoComplete;

const FriendsAutoComplete = (props) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSearch = (searchText) => {
    setValue(searchText);
    dispatch(getUsers('?name=' + searchText))
      .then((users) => setOptions(users));
  };


  const onSelect = (data) => {
    setValue(data);
  };

  const renderOptions = () => options.map((el) => {
    let backgroundImage = API_BASE_URL.replace('/api', '') + el.image;
    if (!el.image) {
      backgroundImage = "../../../images/default-profile-picture.jpg"
    }

    return (
      <Option key={el.id} value={el.name}>
        <div onClick={() => navigate('/friend-profile/' + el.id)} style={{display: 'flex', width: '100%'}}>
          <div className="image" style={{backgroundImage: `url(${backgroundImage})`}}></div>
          <div className="option-wrapper">
            <span style={{fontWeight: 600, fontSize: 18}}>{el.name}</span>
            <span>{el.username}</span>
          </div>
        </div>
      </Option>
    )
  })

  return <div className="autocomplete-wrapper" style={{position: 'relative'}}>
    <AutoComplete
      onSelect={onSelect}
      onSearch={onSearch}
      placeholder="Search user"
      className="input"
      value={value}
    >
      {renderOptions()}

    </AutoComplete>
  </div>
}

export default FriendsAutoComplete;