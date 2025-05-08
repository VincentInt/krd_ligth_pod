import "./HeaderBurger.css";
import telegramImg from "../../../../public/img/icon/image 18.png";
import phoneImg from "../../../../public/img/icon/image 19.png";
import catalogImg from "../../../../public/img/icon/icons8-каталог-64.png";
import dataDropProducts from "../data/dataDropProducts";
import dataLinksHeader from "../data/dataLinksHeader";
import { Link, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

const HeaderBurger = ({ dropBurgerMenuRef, setDropHeader, dropHeader }) => {
  const params = useParams();

  const [dropCatalog, setDropCatalog] = useState(false);
  const [dropProductsCatalog, setDropProductsCatalog] = useState([]);

  const selectedRef = useRef(null);
  const linksRef = useRef(null);

  function onChangeCatalog() {
    const prevState = !dropCatalog;
    if (prevState) {
      setDropCatalog(prevState);
    } else {
      selectedRef.current.style.animation =
        "closeContentHeader 0.5s ease forwards";
      setTimeout(() => {
        setDropCatalog(prevState);
      }, 500);
    }
  }
  function onChangeProductsCatalog(type) {
    const prevState = [...dropProductsCatalog];
    if (prevState.includes(type)) {
      linksRef.current.style.animation =
        "closeContentHeader 0.5s ease forwards";
      setTimeout(() => {
        setDropProductsCatalog(prevState.filter((item) => item !== type));
      }, 500);
    } else {
      setDropProductsCatalog([...prevState, type]);
    }
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
      setDropProductsCatalog([]);
    }
  }, [dropHeader]);

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
                <div ref={selectedRef} className="selected">
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
                            <div
                              ref={linksRef}
                              className="container_selected_links"
                            >
                              <Link
                                onClick={() => window.scroll(0, 0)}
                                to={item.path}
                              >
                                <h5 className="text_link">Все товары</h5>
                              </Link>
                              {dataDropProducts[item.type].map(
                                (item, index) => {
                                  return (
                                    <Link
                                      key={index}
                                      onClick={() => window.scroll(0, 0)}
                                      to={item.path}
                                    >
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
              <a href="https://t.me/USLISHAL_ZOV">
                <img src={telegramImg} alt="telegram_img" />
                <h5>USLISHAL_ZOV</h5>
              </a>
              <a href="tel:+7 918 988 777">
                <img src={phoneImg} alt="phone_img" />
                <h5>+7 918 988 777</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBurger;
