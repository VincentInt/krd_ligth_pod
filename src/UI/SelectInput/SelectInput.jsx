import "./SelectInput.css";
import checkMarkImg from "../../../public/img/icon/icons8-галочка-24.png";

const SelectInput = ({ onChange, state, children }) => {
  return (
    <div onClick={() => onChange(!state)} className="container_select_input">
      <div className="container_select_square">
        {state ? <img src={checkMarkImg} alt="check_mark_img" /> : ""}
      </div>
      {children}
    </div>
  );
};

export default SelectInput;
