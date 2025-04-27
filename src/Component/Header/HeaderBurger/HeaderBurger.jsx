import "./HeaderBurger.css";
import telegramImg from "../../../../public/img/icon/image 18.png";
import phoneImg from "../../../../public/img/icon/image 19.png";
import catalogImg from "../../../../public/img/icon/icons8-каталог-64.png";
import dataDropProducts from "../data/dataDropProducts";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import dataLinksHeader from "../data/dataLinksHeader";

const HeaderBurger = ({ dropBurgerMenuRef, setDropHeader, dropHeader }) => {
  const params = useParams();
  
  const [dropCatalog, setDropCatalog] = useState(false);
  const [dropProductsCatalog, setDropProductsCatalog] = useState([]);

  function onChangeCatalog() {
    setDropCatalog((prev) => !prev);
  }
  function onChangeProductsCatalog(type) {
    setDropProductsCatalog((prev) => {
      const clone = [...prev];
      if (clone.includes(type)) {
        return clone.filter((item) => item !== type);
      } else {
        return [...clone, type];
      }
    });
  }
  function onChangeCloseHeader(e) {
    if (e.target === dropBurgerMenuRef.current) {
      setDropHeader((prev) => ({ click: e, status: !prev.status }));
    }
  }
  useEffect(() => {
    setDropCatalog(false);
    setDropProductsCatalog([]);
  }, [params]);

  useEffect(() => {
    if (dropHeader.status === false) {
      setDropCatalog(false);
    }
  }, [dropHeader]);

  window.onresize = () => {
    if (window.screen.width >= 960) {
      setDropHeader((prev) => ({ click: {}, status: false }));
    }
  };
  return (
    <header
      ref={dropBurgerMenuRef}
      onTouchStart={onChangeCloseHeader}
      className="header_burger"
    >
      <div className="nav">
        <div className="drop_burger_menu">
          <div className="container_items_header">
            <div className="container_selected">
              <button onClick={onChangeCatalog} className="catalog_btn">
                <img src={catalogImg} alt="catalog_img" />
                <h5 className="text_link">Каталог</h5>
              </button>
              {dropCatalog ? (
                <div className="selected">
                  <div className="container_selected_links">
                    {dataLinksHeader.productsBtn.map((item, index) => {
                      return (
                        <div key={index}>
                          <button
                            onTouchStart={() =>
                              onChangeProductsCatalog(item.type)
                            }
                          >
                            <h5 className="text_link">{item.name}</h5>
                          </button>
                          {dropProductsCatalog.includes(item.type) ? (
                            <div className="container_selected_links">
                              <Link to={item.path}>
                                <h5 className="text_link">Все товары</h5>
                              </Link>
                              {dataDropProducts[item.type].map(
                                (item, index) => {
                                  return (
                                    <Link key={index} to={item.path}>
                                      <h5 className="text_link">{item.name}</h5>
                                    </Link>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {dataLinksHeader.headerBtn.map((item, index) => {
              return (
                <Link key={index} to={item.path}>
                  <img src={item.img} alt="header_btn_img" />
                  <h5>{item.name}</h5>
                </Link>
              );
            })}
          </div>
          <div className="container_items_header">
            <div className="container_contact">
              <div className="item_contact">
                <img src={telegramImg} alt="telegram_img" />
                <a href="https://t.me/USLISHAL_ZOV">
                  <h5>USLISHAL_ZOV</h5>
                </a>
              </div>
              <div className="item_contact">
                <img src={phoneImg} alt="phone_img" />
                <a href="tel:+7 918 988 777">
                  <h5>+7 918 988 777</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBurger;
