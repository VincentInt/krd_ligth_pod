import "./BasketProductCard.css";
import basketDeleteWhiteImg from "../../../../public/img/icon/icons8-галочка-50.png";
import favoriteAddWhiteImg from "../../../../public/img/icon/icons8-закладка-лента-50.png";
import favoriteDeleteWhiteImg from "../../../../public/img/icon/icons8-закладка-лента-24 (4).png";
import basketDeleteBlackImg from "../../../../public/img/icon/icons8-собранная-корзина-покупок-24 (2).png";
import favoriteAddBlackImg from "../../../../public/img/icon/icons8-bookmark-24.png";
import favoriteDeleteBlackImg from "../../../../public/img/icon/icons8-закладка-лента-24 (4).png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBasket,
  editBasket,
} from "../../../store/basketSlice/basketSlice";
import { useEffect, useMemo, useState } from "react";
import {
  addFavorite,
  editFavorite,
} from "../../../store/favoriteSlice/favoriteSlice";
import { editViewModalWindow } from "../../../store/modalWindowSlice/modalWindowSlice";

const BasketProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const editBasketReducer = editBasket;
  const deleteBasketReducer = deleteBasket;
  const addFavoriteReducer = addFavorite;
  const editFavoriteReducer = editFavorite;
  const stateOpenModalWindow = editViewModalWindow;

  const favoritesSelector = useSelector(
    (state) => state.favoriteReducer.favorites
  );
  const cookieSelector = useSelector((state) => state.cookieReducer.cookie);

  const [statusBlurImg, setStatusBlurImg] = useState(true);

  const addFavoriteStatus = useMemo(() => {
    const findFavorites = favoritesSelector.find(
      (itemFind) => itemFind.id === item.id
    );
    const findFavoritesCookie = cookieSelector?.favorites?.find(
      (itemFind) => itemFind.id === item.id
    );
    return !Boolean(findFavorites || findFavoritesCookie);
  }, [item, favoritesSelector, cookieSelector]);

  useEffect(() => {
    if (!statusBlurImg !== cookieSelector?.adult) {
      setStatusBlurImg(() =>
        typeof cookieSelector?.adult === "boolean"
          ? !cookieSelector?.adult
          : true
      );
    }
  }, [statusBlurImg, cookieSelector]);

  function onChangeDeleteBasket() {
    dispatch(
      deleteBasketReducer({
        type: item.type,
        id: item.id,
      })
    );
  }
  function onChangeCountItemsProducts(step) {
    const nextStep = item.count + step;
    dispatch(
      editBasketReducer({
        type: item.type,
        id: item.id,
        count: nextStep > 0 ? nextStep : 1,
      })
    );
  }
  function onChangeFavorite() {
    if (addFavoriteStatus) {
      dispatch(addFavoriteReducer([{ typeProducts: item.type, id: item.id }]));
    } else {
      dispatch(editFavoriteReducer({ typeProducts: item.type, id: item.id }));
    }
  }
  function onChangeOpenModalWindow() {
    dispatch(stateOpenModalWindow(true));
  }
  return (
    <div className="container_basket_product_card">
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
                alt="basket_product_img"
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
          <div className="container_count_items">
            <button onClick={() => onChangeCountItemsProducts(-1)}>
              <h5>-</h5>
            </button>
            <div className="container_text_count">
              <h5>{item.count}</h5>
            </div>
            <button onClick={() => onChangeCountItemsProducts(1)}>
              <h5>+</h5>
            </button>
          </div>
        </div>
        <div className="item_content">
          <div className="container_flex">
            <div className="container_price">
              {item.discount ? (
                <h6>
                  {new Intl.NumberFormat("ru", {
                    maximumFractionDigits: 0,
                  }).format(item.price * item.count)}
                  ₽
                </h6>
              ) : (
                ""
              )}
              <h4>
                {new Intl.NumberFormat("ru", {
                  maximumFractionDigits: 0,
                }).format(
                  item.discount
                    ? item.discount * item.count
                    : item.price * item.count
                )}
                ₽
              </h4>
            </div>
            <div className="container_nav">
              <button onClick={onChangeFavorite}>
                <img
                  className="icon"
                  src={
                    addFavoriteStatus
                      ? favoriteAddBlackImg
                      : favoriteDeleteBlackImg
                  }
                  alt="favorite_img"
                />
              </button>
              <button onClick={() => onChangeDeleteBasket()}>
                <img
                  className="icon"
                  src={basketDeleteBlackImg}
                  alt="trash_img"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container_adaptive_nav">
        <div className="container_nav">
          <div className="container_price">
            {item.discount ? (
              <h6>
                {new Intl.NumberFormat("ru", {
                  maximumFractionDigits: 0,
                }).format(item.price * item.count)}
                ₽
              </h6>
            ) : (
              ""
            )}

            <h4>
              {new Intl.NumberFormat("ru", {
                maximumFractionDigits: 0,
              }).format(
                item.discount
                  ? item.discount * item.count
                  : item.price * item.count
              )}
              ₽
            </h4>
          </div>
          <div className="container_count_items">
            <button onClick={() => onChangeCountItemsProducts(-1)}>
              <h5>-</h5>
            </button>
            <div className="container_text_count">
              <h5>{item.count}</h5>
            </div>
            <button onClick={() => onChangeCountItemsProducts(1)}>
              <h5>+</h5>
            </button>
          </div>
        </div>
        <div className="container_btn">
          <button onClick={onChangeFavorite}>
            <img
              src={
                addFavoriteStatus ? favoriteAddWhiteImg : favoriteDeleteWhiteImg
              }
              alt="favorite_img"
            />
          </button>
          <button onClick={() => onChangeDeleteBasket()}>
            <img src={basketDeleteWhiteImg} alt="basket_img" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketProductCard;
