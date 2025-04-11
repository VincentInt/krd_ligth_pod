import FilterOptions from "./FilterOptions/FilterOptions";

const Filter = ({ typeParams, stateFilterOptions, setStateFilterOptions }) => {
  return (
    <div className="container_filter">
      <div className="content_filter">
        <div className="container_title">
          <h5 className="title_text">Фильтр</h5>
          <button className="clear_btn">
            <h6>Очистить</h6>
          </button>
        </div>
        {stateFilterOptions?.map((item, index) => {
          return (
            <FilterOptions
              typeParams={typeParams}
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
