import "./Input.css";
import { useState } from "react";

const Input = ({ value, onChange, ...props }) => {
  const [valueInput, setValueInput] = useState(value ? value : "");

  function onChangeValueInput(event) {
    const valueChange = onChange ? onChange(event, valueInput) : null;
    setValueInput(valueChange ? valueChange : event.target.value);
  }
  return <input {...props} onChange={onChangeValueInput} value={valueInput} />;
};

export default Input;
