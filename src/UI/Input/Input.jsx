import "./Input.css";
import { useEffect, useState } from "react";

const Input = ({ value, onChange, ...props }) => {
  const [valueInput, setValueInput] = useState(value ? value : "");

  function onChangeValueInput(event) {
    setValueInput(onChange ? onChange(event.target.value) : event.target.value);
  }
  return (
    <input
      {...props}
      onChange={onChangeValueInput}
      value={valueInput}
      type="text"
    />
  );
};

export default Input;
