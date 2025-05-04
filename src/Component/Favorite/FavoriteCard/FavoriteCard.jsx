import "./FavoriteCard.css";
import basketAddBlackImg from "../../../../public/img/icon/icons8-добавить-в-корзину-покупок-24.png";
import basketAddWhiteImg from "../../../../public/img/icon/icons8-shopping-basket-add-24.png";
import basketDeleteBlackImg from "../../../../public/img/icon/icons8-собранная-корзина-покупок-24 (2).png";
import basketDeleteWhiteImg from "../../../../public/img/icon/icons8-галочка-50.png";

import favoriteDeleteBlackImg from "../../../../public/img/icon/icons8-закладка-лента-24 (5).png";
import favoriteDeleteWhiteImg from "../../../../public/img/icon/icons8-закладка-лента-24 (4).png";

import { useDispatch, useSelector } from "react-redux";
import { editFavorite } from "../../../store/favoriteSlice/favoriteSlice";
import { useEffect, useMemo, useState } from "react";
import {
  addBasket,
  deleteBasket,
} from "../../../store/basketSlice/basketSlice";
import { editViewModalWindow } from "../../../store/modalWindowSlice/modalWindowSlice";

const FavoriteCard = ({ item }) => {
  const dispatch = useDispatch();

  const deleteFavorite = editFavorite;
  const addBasketReducer = addBasket;
  const deleteBasketReducer = deleteBasket;
  const stateOpenModalWindow = editViewModalWindow;

  const basketSelector = useSelector((state) => state.basketReducer.basket);
  const cookieSelector = useSelector((state) => state.cookieReducer.cookie);

  const [statusBlurImg, setStatusBlurImg] = useState(true);

  useEffect(() => {
    if (!statusBlurImg !== cookieSelector?.adult) {
      setStatusBlurImg(() =>
        typeof cookieSelector?.adult === "boolean"
          ? !cookieSelector?.adult
          : true
      );
    }
  }, [statusBlurImg, cookieSelector]);

  const addBasketStatus = useMemo(() => {
    const findBasket = basketSelector.find(
      (itemFind) => itemFind.id === item.id
    );
    const findBasketCookie = cookieSelector.basket.find(
      (itemFind) => itemFind.id === item.id
    );
    return !Boolean(findBasket || findBasketCookie);
  }, [item, basketSelector, cookieSelector]);

  function onChangeDeleteFavorite() {
    dispatch(deleteFavorite({ typeProducts: item.typeProducts, id: item.id }));
  }
  function onChangeBasket() {
    if (addBasketStatus) {
      dispatch(
        addBasketReducer([{ type: item.typeProducts, id: item.id, count: 1 }])
      );
    } else {
      dispatch(deleteBasketReducer({ type: item.typeProducts, id: item.id }));
    }
  }
  function onChangeOpenModalWindow() {
    dispatch(stateOpenModalWindow(true));
  }
  return (
    <div className="container_favorite_product_card">
      <div className="container_content">
        <div className="item_content">
          <div className="container_flex">
            <div className="container_img">
              {statusBlurImg ? (
                <button onClick={onChangeOpenModalWindow}>
                  <h3>+18</h3>
                </button>
              ) : (
                ""
              )}
              <img
                className="img_product"
                style={statusBlurImg ? { filter: "blur(8px)" } : {}}
                src={item.img}
                alt="favorite_product_img"
              />
            </div>
            <div className="container_text">
              <h4>
                {item.brand} {item.model}
              </h4>
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
              <div className="container_info">
                {item.cardInfo.map((item, index) => {
                  return (
                    <h6 key={index}>
                      {item.infoName}: <span>{item.info}</span>
                    </h6>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="item_content">
          <div className="container_price">
            {item.discount ? (
              <h6>
                {new Intl.NumberFormat("ru", {
                  maximumFractionDigits: 0,
                }).format(item.discount)}
                ₽
              </h6>
            ) : (
              ""
            )}
            <h4>
              {new Intl.NumberFormat("ru", {
                maximumFractionDigits: 0,
              }).format(item.price)}
              ₽
            </h4>
          </div>
        </div>
        <div className="item_content">
          <div className="container_flex">
            <div className="container_nav">
              <button onClick={onChangeDeleteFavorite}>
                <img
                  className="icon"
                  src={favoriteDeleteBlackImg}
                  alt="favorite_img"
                />
              </button>
              <button onClick={onChangeBasket}>
                <img
                  className="icon"
                  src={
                    addBasketStatus ? basketAddBlackImg : basketDeleteBlackImg
                  }
                  alt="basket_img"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container_adaptive_price">
        <div className="container_price">
          {item.discount ? (
            <h6>
              {new Intl.NumberFormat("ru", {
                maximumFractionDigits: 0,
              }).format(item.discount)}
              ₽
            </h6>
          ) : (
            ""
          )}
          <h4>
            {new Intl.NumberFormat("ru", {
              maximumFractionDigits: 0,
            }).format(item.price)}
            ₽
          </h4>
        </div>
        <div className="container_nav">
          <button onClick={onChangeDeleteFavorite}>
            <img src={favoriteDeleteWhiteImg} alt="favorite_img" />
          </button>
          <button onClick={onChangeBasket}>
            <img
              src={addBasketStatus ? basketAddWhiteImg : basketDeleteWhiteImg}
              alt="basket_img"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
