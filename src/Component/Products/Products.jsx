import "./Products.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FilterNav from "./FilterNav/FilterNav";
import SortNav from "./sortNav/SortNav";
import ProductsItems from "./ProductsItems/ProductsItems";
//Гдето есть зависимость
import dataFilter from "./data/dataFilters";
//
import dataProducts from "./data/dataProducts.json";
import filterParamsOptions from "./module/filterParamsOptions";
import addParamsInFilter from "./module/addParamsInFilter";

const Products = () => {
  const typeParams = useParams().type;
  const filterParams = useParams().filter;

  const [stateDropFilter, setStateDropFilter] = useState(null);
  const [sortState, setSortState] = useState({
    sortName: "по релевантности",
    sortType: "убывание",
  });
  const [stateFilterOptions, setStateFilterOptions] = useState([]);

  useEffect(() => {
    const dataFilterOptions = [...dataFilter[typeParams]];
    setStateFilterOptions(() =>
      filterParams
        ? filterParamsOptions(dataFilterOptions, filterParams)
        : dataFilterOptions
    );
    setSortState({
      sortName: "по релевантности",
      sortType: "убывание",
    });
  }, [filterParams, typeParams]);

  useEffect(() => {
    if (stateFilterOptions.length) {
      const dataFilterOptions = [...dataFilter[typeParams]];
      addParamsInFilter(stateFilterOptions, dataFilterOptions);
    }
  }, [stateFilterOptions]);

  useEffect(() => {
    if (stateDropFilter) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [stateDropFilter]);

  useEffect(() => {
    onCheckSize();
    window.onresize = () => {
      onCheckSize();
    };
  }, []);

  function onCheckSize() {
    if (window.screen.width > 960) {
      setStateDropFilter(null);
    } else if (stateDropFilter === null) {
      setStateDropFilter(false);
    }
  }
  return (
    <section className="section_products">
      <div className="container_products">
        <div className="container_title">
          <div className="title">
            <h3>Одноразовые</h3>
            <h4 className="text_count_product">
              {dataProducts[typeParams].length} товаров
            </h4>
          </div>
          {stateFilterOptions ? (
            <div className="container_btn_drop_filter">
              <button onClick={() => setStateDropFilter((prev) => !prev)}>
                Фильтр
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="container_nav_product">
          <div className="nav_product">
            <SortNav sortState={sortState} setSortState={setSortState} />
            <ProductsItems
              sortState={sortState}
              stateFilterOptions={stateFilterOptions}
            />
          </div>
          {stateFilterOptions ? (
            <FilterNav
              stateFilterOptions={stateFilterOptions}
              setStateFilterOptions={setStateFilterOptions}
              stateDropFilter={stateDropFilter}
              setStateDropFilter={setStateDropFilter}
            />
          ) : (
            ""
          )}
        </div>
        <div className="container_products_zone">
          <div className="container_items_products"></div>
          <div className="container_filter_products"></div>
        </div>
      </div>
    </section>
  );
};

export default Products;
