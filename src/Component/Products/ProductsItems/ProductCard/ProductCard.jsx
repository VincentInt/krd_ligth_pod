import "./ProductCard.css";
import addBasketImg from "../../../../../public/img/icon/icons8-shopping-basket-add-24.png";
import deleteBasketImg from "../../../../../public/img/icon/icons8-галочка-50.png";
import addFavoriteImg from "../../../../../public/img/icon/icons8-закладка-лента-50.png";
import deleteFavoriteImg from "../../../../../public/img/icon/icons8-закладка-лента-24 (4).png";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBasket,
  deleteBasket,
} from "../../../../store/basketSlice/basketSlice";
import { editViewModalWindow } from "../../../../store/modalWindowSlice/modalWindowSlice";
import {
  addFavorite,
  editFavorite,
} from "../../../../store/favoriteSlice/favoriteSlice";

const ProductCard = ({ item, typeProducts }) => {
  const dispatch = useDispatch();

  const addFavoriteReducer = addFavorite;
  const addBasketReducer = addBasket;
  const deleteBasketReducer = deleteBasket;
  const editFavoriteReducer = editFavorite;
  const stateOpenModalWindow = editViewModalWindow;

  const favoritesSelector = useSelector(
    (state) => state.favoriteReducer.favorites
  );
  const basketSelector = useSelector((state) => state.basketReducer.basket);
  const cookieSelector = useSelector((state) => state.cookieReducer.cookie);

  const [statusBlurImg, setStatusBlurImg] = useState(true);

  const addBasketStatus = useMemo(() => {
    const findBasket = basketSelector.find(
      (itemFind) => itemFind.id === item.id
    );
    const findBasketCookie = cookieSelector.basket.find(
      (itemFind) => itemFind.id === item.id
    );
    return !Boolean(findBasket || findBasketCookie);
  }, [item, basketSelector, cookieSelector]);

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

  function onChangeBasket() {
    if (addBasketStatus) {
      dispatch(
        addBasketReducer([{ type: typeProducts, id: item.id, count: 1 }])
      );
    } else {
      dispatch(deleteBasketReducer({ type: typeProducts, id: item.id }));
    }
  }
  function onChangeOpenModalWindow() {
    dispatch(stateOpenModalWindow(true));
  }
  function onChangeFavorite() {
    if (addFavoriteStatus) {
      dispatch(addFavoriteReducer([{ typeProducts: typeProducts, id: item.id }]));
    } else {
      dispatch(
        editFavoriteReducer({ typeProducts: typeProducts, id: item.id })
      );
    }
  }
  return (
    <div className="container_item_card">
      <div className="item_card">
        <div className="container_img">
          {statusBlurImg ? (
            <button onClick={onChangeOpenModalWindow}>
              <h3>+18</h3>
            </button>
          ) : (
            ""
          )}
          <img
            style={statusBlurImg ? { filter: "blur(8px)" } : {}}
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
              <div className="price">
                {item.discount ? (
                  <h6
                    style={{ content: item.discount }}
                    className="text_discount"
                  >
                    {new Intl.NumberFormat("ru", {
                      maximumFractionDigits: 0,
                    }).format(item.price)}
                    ₽
                  </h6>
                ) : (
                  ""
                )}
                <h5 className="text_price">
                  {new Intl.NumberFormat("ru", {
                    maximumFractionDigits: 0,
                  }).format(item.discount ? item.discount : item.price)}
                  ₽
                </h5>
              </div>
              <div className="container_nav">
                <button
                  onClick={onChangeFavorite}
                  className={
                    addBasketStatus ? "btn_add_basket" : "btn_delete_basket"
                  }
                >
                  <img
                    src={addFavoriteStatus ? addFavoriteImg : deleteFavoriteImg}
                    alt="favorite_img"
                  />
                </button>
                <button
                  onClick={onChangeBasket}
                  className={
                    addBasketStatus ? "btn_add_basket" : "btn_delete_basket"
                  }
                >
                  <img
                    src={addBasketStatus ? addBasketImg : deleteBasketImg}
                    alt="basket_img"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
