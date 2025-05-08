import { useEffect, useRef } from "react";
import FilterOptions from "./FilterOptions/FilterOptions";

const Filter = ({
  stateFilterOptions,
  setStateFilterOptions,
  setStateDropFilter,
}) => {
  const dropFilterRef = useRef(null);
  const contentFilterRef = useRef(null);

  function onClickCloseDropFilter(e) {
    if (e.target === dropFilterRef.current) {
      dropFilterRef.current.style.animation =
        "closeBackgroundFilterDrop 0.5s ease forwards";
      contentFilterRef.current.style.animation =
        "closeFilterDrop 0.5s ease forwards";
      setTimeout(() => {
        setStateDropFilter(false);
      }, 500);
    }
  }
  return (
    <div
      ref={dropFilterRef}
      onClick={(e) => onClickCloseDropFilter(e)}
      className="drop_container_filter"
    >
      <div ref={contentFilterRef} className="content_filter">
        <div className="filter">
          <div className="container_title">
            <h5 className="title_text">Фильтр</h5>
            <button className="clear_btn">
              <h6>Очистить</h6>
            </button>
          </div>
          {stateFilterOptions?.map((item, index) => {
            return (
              <FilterOptions
                item={item}
                indexFilterOptions={index}
                stateFilterOptions={stateFilterOptions}
                setStateFilterOptions={setStateFilterOptions}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filter;
