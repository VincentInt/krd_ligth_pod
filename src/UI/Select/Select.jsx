import "./Select.css";
import upArrowImg from "../../../public/img/icon/icons8-стрелка-100 (1).png";
import downArrowImg from "../../../public/img/icon/icons8-стрелка-100.png";
import { useEffect, useState } from "react";

const Select = ({ selected, selects, onChange }) => {
  const [currentSelect, setCurrentSelect] = useState(selects[0]);
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    if (selected) {
      setCurrentSelect(selected);
    } else {
      setCurrentSelect(selects[0]);
      onChange(selects[0]);
    }
  }, [selected]);

  function onChangeOpenSelects() {
    setStatusOpen((prev) => !prev);
  }
  function onChangeSelect(select) {
    setCurrentSelect(select);
    onChange(select);
    setStatusOpen((prev) => !prev);
  }

  return (
    <div
      style={
        statusOpen
          ? { borderRadius: "8px 8px 0px 0px" }
          : { borderRadius: "8px 8px 8px 8px" }
      }
      className="container_select"
    >
      <button onClick={onChangeOpenSelects} className="current_btn">
        <h6>{currentSelect?.name}</h6>
        <img src={statusOpen ? upArrowImg : downArrowImg} alt="arrow_img" />
      </button>
     
      {statusOpen ? (
        <div className="container_selects">
          {selects?.map((item, index) => {
            return (
              <button
                onClick={
                  item?.name !== currentSelect?.name
                    ? () => onChangeSelect(item)
                    : () => {}
                }
                key={index}
                className="select_btn"
              >
                <h6
                  style={
                    item?.name !== currentSelect?.name
                      ? { color: "black" }
                      : { color: "red" }
                  }
                >
                  {item?.name}
                </h6>
              </button>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Select;
