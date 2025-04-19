import "./FilterItem.css";
import { useEffect, useState } from "react";
import upArrowImg from "../../../../../public/img/icon/icons8-стрелка-100 (1).png";
import downArrowImg from "../../../../../public/img/icon/icons8-стрелка-100.png";

const FilterItem = ({
  typeParams,
  nameFilterItem,
  defaultStateOpen = true,
  children,
}) => {
  const [stateOpen, setStateOpen] = useState(defaultStateOpen);
  const [stateMore, setStateMore] = useState(null);

  useEffect(() => {
    setStateOpen(defaultStateOpen);
    if (children.length > 6) {
      setStateMore(1);
    } else {
      setStateMore(null);
    }
  }, [typeParams]);

  function onMoreFilter() {
    if (children.length > stateMore * 6) {
      setStateMore((prev) => prev + 1);
    } else {
      setStateMore(1);
    }
  }
  return (
    <div className="item_filter">
      <div
        onClick={() => setStateOpen((prev) => !prev)}
        className="container_select_item"
      >
        <h5>{nameFilterItem}:</h5>
        <img
          src={stateOpen ? downArrowImg : upArrowImg}
          alt="arrow_item_filter_img"
        />
      </div>
      <div
        className={`container_input_filter ${stateOpen ? "open" : "close"} `}
      >
        <div className="input_filter">
          {stateMore !== null ? (
            <>
              {Array.isArray(children) ? children.slice(0, stateMore * 6) : ""}

              <button onClick={onMoreFilter} className="btn_more">
                <img
                  src={
                    children.length > stateMore * 6 ? downArrowImg : upArrowImg
                  }
                  alt="arrow_img"
                />
                <h6>
                  {children.length > stateMore * 6
                    ? "Показать еще"
                    : "Свернуть"}
                </h6>
              </button>
            </>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
