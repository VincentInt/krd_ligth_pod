import "./Products.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import FilterNav from "./FilterNav/FilterNav";
import SortNav from "./SortNav/SortNav.jsx";
import ProductsItems from "./ProductsItems/ProductsItems";
import dataFilters from "../../../public/data/dataFilters";
import dataProducts from "../../../public/data/dataProducts";
import filterParamsOptions from "./module/filterParamsOptions";
import addParamsInFilter from "./module/addParamsInFilter";
import { editScrollState } from "../../store/scrollStateSlice/scrollStateSlice.js";
import { useDispatch } from "react-redux";

const Products = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const typeProductsParams = useParams().type;
  const filterParams = useParams().filter;

  const [stateDropFilter, setStateDropFilter] = useState(null);
  const [sortState, setSortState] = useState({
    sortName: "по популярности",
    sortType: "убывание",
  });
  const [stateFilterOptions, setStateFilterOptions] = useState([]);

  const titleText = useMemo(() => {
    switch (typeProductsParams) {
      case "disposablePods":
        return "Одноразки";
      case "podSystems":
        return "Под-системы";
      case "eLiquids":
        return "Жидкости";
      default:
        return "";
    }
  }, [typeProductsParams]);

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
      sortName: "по популярности",
      sortType: "убывание",
    });
  }, [typeProductsParams, filterParams]);

  useEffect(() => {
    if (stateFilterOptions.length) {
      const dataFilterOptions = dataFilters[typeProductsParams].map((item) => ({
        ...item,
      }));
      const paramsFilter = addParamsInFilter(
        stateFilterOptions,
        dataFilterOptions
      );
      navigate(
        { pathname: `/products/${typeProductsParams}/${paramsFilter}` },
        { replace: true }
      );
    }
  }, [stateFilterOptions]);

  useEffect(() => {
    if (typeof stateDropFilter === "boolean") {
      if (stateDropFilter) {
        dispatch(editScrollState({ filterDrop: false }));
      } else {
        dispatch(editScrollState({ filterDrop: true }));
      }
    }
  }, [stateDropFilter]);

  useEffect(() => {
    onCheckSize();
    window.addEventListener(
      "resize",
      () => {
        onCheckSize();
      },
      true
    );
  }, []);
  function onCheckSize() {
    if (window.screen.width > 960) {
      setStateDropFilter(null);
    } else {
      setStateDropFilter((prev)=> prev === null ? false : prev);
    }
  }
  function onChangeDropFilter() {
    setStateDropFilter(true);
  }

  return (
    <section className="section_products">
      <div className="container_products">
        <div className="container_title">
          <div className="title">
            <h2>{titleText}</h2>
            <h3 className="text_count_product">
              {dataProducts[typeProductsParams].length} товаров
            </h3>
          </div>
          {stateFilterOptions ? (
            <div className="container_btn_drop_filter">
              <button onClick={onChangeDropFilter}>Фильтр</button>
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
