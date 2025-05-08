import "./Select.css";
import upArrowImg from "../../../public/img/icon/icons8-стрелка-100 (1).png";
import downArrowImg from "../../../public/img/icon/icons8-стрелка-100.png";
import { useEffect, useRef, useState } from "react";

const Select = ({ selected, selects, onChange }) => {
  const [currentSelect, setCurrentSelect] = useState(selects[0]);
  const [statusOpen, setStatusOpen] = useState(false);

  const containerSelectsRef = useRef(null);

  useEffect(() => {
    if (selected) {
      setCurrentSelect(selected);
    } else {
      setCurrentSelect(selects[0]);
      onChange(selects[0]);
    }
  }, [selected]);

  function onChangeOpenSelects() {
    if (statusOpen) {
      containerSelectsRef.current.style.animation =
        "closeSelects 0.5s ease forwards";
      setTimeout(() => {
        setStatusOpen(false);
      }, 500);
    } else {
      setStatusOpen(true);
    }
  }
  function onChangeSelect(select) {
    containerSelectsRef.current.style.animation =
      "closeSelects 0.5s ease forwards";
    setTimeout(() => {
      setCurrentSelect(select);
      onChange(select);
      setStatusOpen((prev) => !prev);
    }, 500);
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
        <div ref={containerSelectsRef} className="container_selects">
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
