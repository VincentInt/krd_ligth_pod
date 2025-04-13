import "./SortNav.css";
import downArrowImg from "../../../../public/img/icon/icons8-стрелка-100 (1).png";
import upArrowImg from "../../../../public/img/icon/icons8-стрелка-100.png";

const SortNav = ({ sortState, setSortState }) => {
  const dataSort = [
    {
      sortName: "по релевантности",
    },
    {
      sortName: "по цене",
    },
    {
      sortName: "по отзывам",
    },
    {
      sortName: "по алфавиту",
    },
  ];
  function onSelectSort(sortName) {
    setSortState({ sortName: sortName, sortType: "убывание" });
  }
  function onSelectActiveSort() {
    setSortState((prev) => ({
      ...prev,
      sortType: prev.sortType === "убывание" ? "возрастание" : "убывание",
    }));
  }
  return (
    <div className="container_sort_btn">
      {dataSort.map((item, index) => {
        return (
          <button key={index}>
            {sortState.sortName === item.sortName ? (
              <img
                src={
                  sortState.sortType === "убывание" ? downArrowImg : upArrowImg
                }
                alt="sort_img"
              />
            ) : (
              ""
            )}

            <h6
              className={
                sortState.sortName === item.sortName ? "active_sort" : ""
              }
              onClick={
                sortState.sortName === item.sortName
                  ? () => onSelectActiveSort()
                  : () => onSelectSort(item.sortName)
              }
            >
              {item.sortName}
            </h6>
          </button>
        );
      })}
    </div>
  );
};

export default SortNav;
