import React, { useState } from "react";
import { Input } from "antd";
import "./CustomInput.scss";

const CustomInput = (props) => {

  const [focus, setFocus] = useState(false);
  const { label, value, placeholder, type } = props;

  const isOccupied = focus || (value && value.length !== 0);

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Input
        placeholder={!isOccupied ? placeholder : null}
        onChange={props.onChange}
        type={type}
        defaultValue={value}
        className="input"
      />
      <label className="label">
        {isOccupied ? label : null}
      </label>
    </div>
  );
};

export default CustomInput;
