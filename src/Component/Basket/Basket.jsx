import "./Basket.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dataProducts from "../../../public/data/dataProducts.json";
import BasketProductCard from "./BasketProductCard/BasketProductCard";
import { clearBasket } from "../../store/basketSlice/basketSlice";
import { useNavigate } from "react-router";

const Basket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const basketSelector = useSelector((state) => state.basketReducer.basket);
  const clearBasketReducer = clearBasket;

  const [stateProductsBasket, setStateProductsBasket] = useState([]);

  useEffect(() => {
    setStateProductsBasket(
      basketSelector.map((item) => {
        const findElement = dataProducts[item.type].find(
          (itemFind) => itemFind.id === item.id
        );
        return { ...findElement, type: item.type, count: item.count };
      })
    );
  }, [basketSelector]);

  function onChangeClearBasket() {
    dispatch(clearBasketReducer());
  }
  return (
    <section className="section_basket">
      <div className="basket">
        <div className="container_title">
          <h3>Корзина</h3>
        </div>
        {stateProductsBasket.length > 0 ? (
          <div className="container_basket">
            <nav className="container_basket_nav">
              <div className="item_basket_nav">
                <h4>В корзине</h4>
                <h5>{stateProductsBasket.length} шт товаров</h5>
              </div>
              <div className="item_basket_nav">
                <button className="btn_promo">
                  <h6>Использовать промокод</h6>
                </button>
              </div>
              <div className="item_basket_nav">
                <h3>
                  {new Intl.NumberFormat("ru", {
                    maximumFractionDigits: 0,
                  }).format(
                    stateProductsBasket?.reduce(
                      (acc, a) =>
                        a.discount
                          ? acc + a.discount * a.count
                          : acc + a.price * a.count,
                      0
                    )
                  )}
                  ₽
                </h3>
              </div>
              <div className="item_basket_nav">
                <button className="btn_send">
                  <h6>Оформить</h6>
                </button>
                <button onClick={onChangeClearBasket} className="btn_clear">
                  <h6>Очистить корзину</h6>
                </button>
              </div>
            </nav>
            <div className="container_main_basket">
              <div className="container_basket_products">
                {stateProductsBasket.map((item, index) => {
                  return <BasketProductCard key={index} item={item} />;
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="container_empty_basket">
            <h5>В корзине нет товаров</h5>
            <button onClick={() => navigate(-1)}>
              <h6>Вернуться</h6>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Basket;
