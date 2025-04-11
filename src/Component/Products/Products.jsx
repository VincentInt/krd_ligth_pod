import "./Products.css";
import FilterNav from "./FilterNav/FilterNav";
import SortNav from "./sortNav/SortNav";
import ProductsItems from "./ProductsItems/ProductsItems";
import dataFilter from "./data/dataFilters";
import dataProducts from "./data/dataProducts.json";
import { useEffect, useState } from "react";

const Products = ({ typeParams }) => {
  const [stateDropFilter, setStateDropFilter] = useState(null);
  const [sortState, setSortState] = useState({
    sortName: "по релевантности",
    sortType: "убывание",
  });
  const [stateFilterOptions, setStateFilterOptions] = useState(
    dataFilter[typeParams]
  );
  useEffect(() => {
    setStateFilterOptions(dataFilter[typeParams]);
    setSortState({
      sortName: "по релевантности",
      sortType: "убывание",
    });
  }, [typeParams]);

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
              typeParams={typeParams}
              stateFilterOptions={stateFilterOptions}
            />
          </div>
          {stateFilterOptions ? (
            <FilterNav
              typeParams={typeParams}
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
