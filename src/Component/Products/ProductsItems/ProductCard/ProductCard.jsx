import "./ProductCard.css";
import addBasketImg from "../../../../../public/img/icon/icons8-shopping-basket-add-24.png";
import deleteBasketImg from "../../../../../public/img/icon/icons8-multiply-24.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBasket,
  deleteBasket,
} from "../../../../store/basketSlice/basketSlice";

const ProductCard = ({ item, typeProducts }) => {
  const dispatch = useDispatch();

  const addBasketReducer = addBasket;
  const deleteBasketReducer = deleteBasket;
  const cookieSelector = useSelector((state) => state.cookieReducer.cookie);

  const [statusBlurImg, setStatusBlurImg] = useState(true);
  const [addBasketStatus, setAddBasketStatus] = useState(true);

  useEffect(() => {
    if (!statusBlurImg !== cookieSelector?.adult) {
      setStatusBlurImg(() =>
        typeof cookieSelector?.adult === "boolean"
          ? !cookieSelector?.adult
          : true
      );
    }
  }, [statusBlurImg, cookieSelector]);

  function onChangeAddBasket() {
    setAddBasketStatus(false);

    dispatch(addBasketReducer({ type: typeProducts, id: item.id, count: 1 }));
  }
  function onChangeDeleteBasket() {
    setAddBasketStatus(true);

    dispatch(deleteBasketReducer({ type: typeProducts, id: item.id }));
  }
  return (
    <div className="container_item_card">
      <div className="item_card">
        <div className="container_img">
          <img
            style={statusBlurImg ? { filter: "blur(6px)" } : {}}
            src={item.img}
            alt="card_img"
          />
        </div>
        <div className="container_text">
          <h5 className="title_name_card">
            {item.brand} {item.model}
          </h5>
          <div className="container_info_text">
            <div className="container_rating">
              <div className="container_stars">
                {[...Array(5)].map((_, index) => {
                  const solidStar =
                    index + 1 <= item.rating
                      ? 100
                      : 100 - (index + 1 - item.rating) * 100;
                  return (
                    <div
                      key={index}
                      style={{
                        background: `linear-gradient(90deg, rgb(221, 47, 47) ${solidStar}%, black 0%)`,
                      }}
                      className="star"
                    ></div>
                  );
                })}
              </div>
              <h6>{item.rating}</h6>
            </div>
            {item.cardInfo.map((item, index) => {
              return (
                <div key={index} className="item_info_text">
                  <h6>{item.infoName}:</h6>
                  <h6>{item.info}</h6>
                </div>
              );
            })}
            <div className="container_price">
              <h5 className="text_price">
                {new Intl.NumberFormat("ru", {
                  maximumFractionDigits: 0,
                }).format(item.price)}
                ₽
              </h5>
              {
                <button
                  onClick={
                    addBasketStatus ? onChangeAddBasket : onChangeDeleteBasket
                  }
                  className={
                    addBasketStatus ? "btn_add_basket" : "btn_delete_basket"
                  }
                >
                  <img
                    src={addBasketStatus ? addBasketImg : deleteBasketImg}
                    alt="basket_img"
                  />
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
