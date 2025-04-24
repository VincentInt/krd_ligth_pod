import "./Input.css";
import { useEffect, useState } from "react";

const Input = ({ item, onChange, ...props }) => {
  const [valueInput, setValueInput] = useState(item.select);

  function onChangeValueInput(event) {
    setValueInput(event.target.value);
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(valueInput);
    }, 500);
    return () => clearTimeout(timeout);
  }, [valueInput]);
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
