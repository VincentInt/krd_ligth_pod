import "./Products.css";
import FilterNav from "./FilterNav/FilterNav";
import SortNav from "./sortNav/SortNav";
import ProductsItems from "./ProductsItems/ProductsItems";
import dataFilter from "./data/dataFilters";
import dataProducts from "./data/dataProducts.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
    const dataFilterOptions = dataFilter[typeParams];
    const optionsParamsFilter = filterParams.split(";").map((item) => {
      const splitParams = item.split("=");
      return { typeOption: splitParams[0], value: splitParams[1] };
    });
    optionsParamsFilter.forEach((itemParams) => {
      const filterIndexElem = dataFilterOptions
        .map((itemFind, index) => {
          if (itemFind.typeDataProduct === itemParams.typeOption) {
            return index;
          }
        })
        .filter((item) => item)[0];

      if (dataFilterOptions[filterIndexElem]?.type === "range") {
        const valueRange = itemParams.value.split(",");
        const keysRange = ["selectMin", "selectMax"];
        valueRange.forEach((item, index) => {
          if (
            dataFilterOptions[filterIndexElem].max >= item &&
            dataFilterOptions[filterIndexElem].min <= item
          ) {
            dataFilterOptions[filterIndexElem][keysRange[index]] = +item;
          }
        });
      } else if (dataFilterOptions[filterIndexElem]?.type === "select") {
        const valueSelect = itemParams.value
          .split(",")
          .map((item) => item.toLowerCase());
        dataFilterOptions[filterIndexElem].defaultInputs.forEach((item) => {
          if (valueSelect.includes(item.toLowerCase())) {
            dataFilterOptions[filterIndexElem].select.push(item);
          }
        });
      } else if (dataFilterOptions[filterIndexElem]?.type === "radio") {
        const valueRadio = itemParams.value
          .split(",")
          .map((item) => item.toLowerCase())
          .slice(-1)[0];
        dataFilterOptions[filterIndexElem].defaultInputs.forEach((item) => {
          if (item.toLowerCase() === valueRadio) {
            dataFilterOptions[filterIndexElem].select = item;
          }
        });
      }
    });

    setStateFilterOptions(dataFilterOptions);
    setSortState({
      sortName: "по релевантности",
      sortType: "убывание",
    });
  }, [filterParams, typeParams]);

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
