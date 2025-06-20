import "./ProductsItems.css";
import dataProducts from "../../../../public/data/dataProducts.json";
import ProductCard from "./ProductCard/ProductCard.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProductsItems = ({ stateFilterOptions, sortState }) => {
  const typeProductsParams = useParams().type;
  const [viewProducts, setViewProducts] = useState([]);

  useEffect(() => {
    setViewProducts(() => {
      let filteredProducts = [...dataProducts[typeProductsParams]]
        ?.map((itemProducts) => {
          const statusFalseFiltered = stateFilterOptions
            ?.map((itemFilter) => {
              const stateProduct = itemProducts[[itemFilter.typeDataProduct]];
              switch (itemFilter.type) {
                case "input": {
                  if (itemFilter.select) {
                    return stateProduct
                      .toLowerCase()
                      .includes(itemFilter.select.toLowerCase());
                  } else return true;
                }
                case "range": {
                  if (
                    stateProduct >= itemFilter.selectMin &&
                    stateProduct <= itemFilter.selectMax
                  )
                    return true;
                  else return false;
                }
                case "select": {
                  if (itemFilter.select.length)
                    return itemFilter.select.includes(stateProduct);
                  else return true;
                }
                case "radio": {
                  if (itemFilter.typeDataProduct === "rating") {
                    if (itemFilter.select <= stateProduct) {
                      return true;
                    }
                  }
                  if (itemFilter.select !== "Любой") {
                    return itemFilter.select === stateProduct;
                  } else return true;
                }
              }
            })
            .includes(false);
          if (statusFalseFiltered) {
            return [];
          } else return itemProducts;
        })
        .flat();
      let keySort = null;

      switch (sortState.sortName) {
        case "по популярности":
          keySort = "popularity";
          break;
        case "по цене":
          keySort = "price";
          break;
        case "по отзывам":
          keySort = "rating";
          break;
        case "по алфавиту":
          keySort = "brand";
          break;
      }
      const sortedProducts = filteredProducts.sort((a, b) => {
        if (keySort === "brand") {
          if (sortState.sortType === "убывание") {
            return `${a.brand} ${a.model}` > `${b.brand} ${b.model}` ? 1 : -1;
          } else {
            return `${a.brand} ${a.model}` < `${b.brand} ${b.model}` ? 1 : -1;
          }
        }
        return sortState.sortType === "убывание"
          ? a[keySort] - b[keySort]
          : b[keySort] - a[keySort];
      });
      return sortedProducts;
    });
  }, [stateFilterOptions, sortState]);
  return (
    <div className="container_cards">
      <div className="cards">
        {viewProducts?.length ? (
          viewProducts?.map((item, index) => {
            return (
              <ProductCard
                item={item}
                typeProducts={typeProductsParams}
                key={index}
              />
            );
          })
        ) : (
          <div>
            <h3>Ничего не найдено</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsItems;
