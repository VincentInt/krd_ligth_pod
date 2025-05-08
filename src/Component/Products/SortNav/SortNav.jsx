import "./SortNav.css";
import downArrowImg from "../../../../public/img/icon/icons8-стрелка-100 (1).png";
import upArrowImg from "../../../../public/img/icon/icons8-стрелка-100.png";
import dataSort from "./data/dataSort";
import Select from "../../../UI/Select/Select";
import dataSelectsSort from "./data/dataSelectsSort";
import { useEffect, useState } from "react";

const SortNav = ({ sortState, setSortState }) => {
  const [statusViewSelectsSort, setStatusViewSelectsSort] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => onResizeWindow(), true);
    onResizeWindow();
  }, []);
  function onResizeWindow() {
    if (window.innerWidth >= 460) {
      setStatusViewSelectsSort(false);
    } else {
      setStatusViewSelectsSort(true);
    }
  }

  function onSelectActiveSort() {
    setSortState((prev) => ({
      ...prev,
      sortType: prev.sortType === "убывание" ? "возрастание" : "убывание",
    }));
  }
  function onSelectSort(sortName) {
    setSortState({ sortName: sortName, sortType: "убывание" });
  }
  function onSelectSmallSort(select) {
    setSortState({ sortName: select.sortName, sortType: select.sortType });
  }
  return (
    <div className="container_sort_btn">
      {statusViewSelectsSort ? (
        <div className="container_selects_sort">
          <Select
            onChange={onSelectSmallSort}
            selected={dataSelectsSort.find((item) => {
              return (
                item.sortName === sortState.sortName &&
                item.sortType === sortState.sortType
              );
            })}
            selects={dataSelectsSort}
          />
        </div>
      ) : (
        <div className="sort">
          {dataSort.map((item, index) => {
            return (
              <button key={index}>
                {sortState.sortName === item.name ? (
                  <img
                    src={
                      sortState.sortType === "убывание"
                        ? downArrowImg
                        : upArrowImg
                    }
                    alt="sort_img"
                  />
                ) : (
                  ""
                )}

                <h6
                  className={
                    sortState.sortName === item.name ? "active_sort" : ""
                  }
                  onClick={
                    sortState.sortName === item.name
                      ? () => onSelectActiveSort()
                      : () => onSelectSort(item.name)
                  }
                >
                  {item.name}
                </h6>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SortNav;
