import "./Basket.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dataProducts from "../../../public/data/dataProducts.json";
import BasketProductCard from "./BasketProductCard/BasketProductCard";

const Basket = () => {
  const basketSelector = useSelector((state) => state.basketReducer.basket);

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

  return (
    <section className="section_basket">
      <div className="container_basket">
        <div className="container_main_basket">
          <div className="container_title">
            <h3>Корзина</h3>
          </div>
          <div className="container_basket_products">
            {stateProductsBasket.map((item, index) => {
              return <BasketProductCard key={index} item={item} />;
            })}
          </div>
        </div>
        <nav className="container_basket_nav">
          <div className="item_basket_nav">
            <h4>В корзине</h4>
            <h6>{stateProductsBasket.length} шт товаров</h6>
          </div>
          <div className="item_basket_nav">
            <button className="btn_promo">
              <h6>Использовать промокод</h6>
            </button>
          </div>
          <div className="item_basket_nav">
            <h4>
              {new Intl.NumberFormat("ru", {
                maximumFractionDigits: 0,
              }).format(
                stateProductsBasket?.reduce(
                  (acc, a) => acc + a.price * a.count,
                  0
                )
              )}
              ₽
            </h4>
          </div>
          <div className="item_basket_nav">
            <button className="btn_send">
              <h6>Перейти к оформлению</h6>
            </button>
          </div>
          <div className="item_basket_nav">
            <p className="p_text">
              *Перед оформлением заказа убедитесь, что в корзине верные товары,
              их количество и размеры. Это поможет избежать ошибок и ускорит
              обработку заказа.
            </p>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Basket;
