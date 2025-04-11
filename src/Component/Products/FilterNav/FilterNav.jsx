import "./FilterNav.css";
import Filter from "./Filter/Filter.jsx";
import FilterDrop from "./Filter/FilterDrop.jsx";

const FilterNav = ({
  typeParams,
  stateFilterOptions,
  setStateFilterOptions,
  stateDropFilter,
  setStateDropFilter,
}) => {
  return (
    <>
      {stateDropFilter !== null ? (
        stateDropFilter ? (
          <FilterDrop
            stateFilterOptions={stateFilterOptions}
            setStateDropFilter={setStateDropFilter}
            setStateFilterOptions={setStateFilterOptions}
          />
        ) : (
          ""
        )
      ) : (
        <Filter
          typeParams={typeParams}
          stateFilterOptions={stateFilterOptions}
          setStateFilterOptions={setStateFilterOptions}
        />
      )}
    </>
  );
};

export default FilterNav;
