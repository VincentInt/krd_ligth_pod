import "./Products.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import FilterNav from "./FilterNav/FilterNav";
import SortNav from "./sortNav/SortNav";
import ProductsItems from "./ProductsItems/ProductsItems";
import dataFilters from "../../../public/data/dataFilters";
import dataProducts from "../../../public/data/dataProducts";
import filterParamsOptions from "./module/filterParamsOptions";
import addParamsInFilter from "./module/addParamsInFilter";

const Products = () => {
  const navigate = useNavigate();

  const typeProductsParams = useParams().type;
  const filterParams = useParams().filter;

  const [stateDropFilter, setStateDropFilter] = useState(null);
  const [sortState, setSortState] = useState({
    sortName: "по релевантности",
    sortType: "убывание",
  });
  const [stateFilterOptions, setStateFilterOptions] = useState([]);

  useEffect(() => {
    const dataFilterOptions = dataFilters[typeProductsParams].map((item) => ({
      ...item,
    }));
    setStateFilterOptions(() =>
      filterParams
        ? filterParamsOptions(dataFilterOptions, filterParams)
        : dataFilterOptions
    );

    setSortState({
      sortName: "по релевантности",
      sortType: "убывание",
    });
  }, [typeProductsParams]);

  useEffect(() => {
    if (stateFilterOptions.length) {
      const dataFilterOptions = dataFilters[typeProductsParams].map((item) => ({
        ...item,
      }));
      const paramsFilter = addParamsInFilter(
        stateFilterOptions,
        dataFilterOptions
      );
      navigate({ pathname: `/products/${typeProductsParams}/${paramsFilter}` });
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
              {dataProducts[typeProductsParams].length} товаров
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
