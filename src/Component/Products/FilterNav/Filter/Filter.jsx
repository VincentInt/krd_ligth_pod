import FilterOptions from "./FilterOptions/FilterOptions";
import dataFilters from "../../../../../public/data/dataFilters";
import { useParams } from "react-router";

const Filter = ({ stateFilterOptions, setStateFilterOptions }) => {
  const typeProductsParams = useParams().type;

  function clearFilter() {
    setStateFilterOptions(
      dataFilters[typeProductsParams].map((item) => ({ ...item }))
    );
  }
  return (
    <div className="container_filter">
      <div className="content_filter">
        <div className="container_title">
          <h5 className="title_text">Фильтр</h5>
          <button onClick={clearFilter} className="clear_btn">
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
  );
};

export default Filter;
