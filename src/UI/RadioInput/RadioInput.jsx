import "./RadioInput.css";

const RadioInput = ({ onChange, state, children }) => {
  return (
    <div onClick={onChange} className="container_radio_input">
      <div className="container_radio_ball">
        {state ? <div className="radio_ball"></div> : ""}
      </div>
      {children}
    </div>
  );
};

export default RadioInput;
