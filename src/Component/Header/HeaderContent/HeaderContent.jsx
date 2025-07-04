import "./HeaderContent.css";
import logoImg from "../../../../public/img/Logo.png";
import burgerMenuImg from "../../../../public/img/icon/icons8-гамбургер-меню-50.png";
import catalogImg from "../../../../public/img/icon/icons8-каталог-64.png";
import dataDropProducts from "../data/dataDropProducts";
import dataLinksHeader from "../data/dataLinksHeader";
import { Link, useParams } from "react-router";
import { useEffect, useRef } from "react";

const HeaderContent = ({
  stateDropProducts,
  setStateDropProducts,
  dropCatalog,
  setDropCatalog,
  setDropHeader,
}) => {
  const params = useParams();

  const containerDropCatalogRef = useRef(null);

  function onChangeDropCatalog() {
    setDropCatalog(true);

    window.onmouseover = (e) => {
      let index = 0;
      let parentElem = e.target;
      const containerDropCatalog = containerDropCatalogRef.current;
      while (index !== true && index < 6) {
        if (
          parentElem?.className === "catalog_btn" ||
          parentElem?.className === "container_drop_catalog"
        ) {
          index = true;
        } else {
          parentElem = parentElem?.parentElement;
          ++index;
        }
      }
      if (index === 6) {
        window.onmouseover = () => {};
        if (containerDropCatalog) {
          containerDropCatalog.style.animation =
            "closeHeaderContent 0.5s ease forwards";
        }

        setTimeout(() => {
          setDropCatalog(false);
          setStateDropProducts(false);
        }, 300);
      }
    };
  }
  function onChangeDropProducts(key) {
    setStateDropProducts({ name: key, value: dataDropProducts[key] });
  }
  useEffect(() => {
    if (dropCatalog === false) {
      setStateDropProducts({ name: "", value: [] });
    }
  }, [dropCatalog]);
  return (
    <div className="container_header">
      <Link to={"/"}>
        <div className="logo">
          <img src={logoImg} alt="logo_img" />
        </div>
      </Link>
      <div className="container_links">
        <div className="links">
          <button className="catalog_btn" onMouseEnter={onChangeDropCatalog}>
            <img src={catalogImg} alt="catalog_img" />
            <h6>Каталог</h6>
          </button>
          {dataLinksHeader.headerBtn.map((item, index) => {
            return (
              <Link
                key={index}
                onClick={() => window.scroll(0, 0)}
                to={item.path}
              >
                <img src={item.img} alt="header_btn_img" />
                <h6>{item.name}</h6>
              </Link>
            );
          })}
        </div>
        {dropCatalog ? (
          <div ref={containerDropCatalogRef} className="container_drop_catalog">
            <div className="container_products_links">
              <div className="products_links">
                {dataLinksHeader.productsBtn.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      onClick={() => window.scroll(0, 0)}
                      className={
                        stateDropProducts.name === item.type ||
                        stateDropProducts.name === ""
                          ? "select"
                          : "dont_select"
                      }
                      onMouseEnter={() => onChangeDropProducts(item.type)}
                      to={item.path}
                    >
                      <h6>{item.name}</h6>
                    </Link>
                  );
                })}
              </div>
              {stateDropProducts.value?.length ? (
                <div className="products_links">
                  {stateDropProducts.value?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        onClick={() => window.scroll(0, 0)}
                        to={item.path}
                      >
                        <h6>{item.name}</h6>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="burger_menu">
        <button
          onClick={(e) =>
            setDropHeader((prev) => ({ click: {}, status: !prev.status }))
          }
          className="btn_burger_menu"
        >
          <img src={burgerMenuImg} alt="burger_menu_img" />
        </button>
      </div>
    </div>
  );
};

export default HeaderContent;
