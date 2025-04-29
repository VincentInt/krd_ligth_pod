import "./BasketProductCard.css";
import trashImg from "../../../../public/img/icon/icons8-trash-32.png";
import favoriteImg from "../../../../public/img/icon/icons8-bookmark-24.png";
import { useDispatch } from "react-redux";
import {
  deleteBasket,
  editBasket,
} from "../../../store/basketSlice/basketSlice";

const BasketProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const editBasketReducer = editBasket;
  const deleteBasketReducer = deleteBasket;

  function onChangeDelete() {
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

  return (
    <div className="container_basket_product_card">
      <div className="container_content">
        <div className="item_content">
          <div className="container_flex">
            <div className="container_img">
              <img
                className="img_product"
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
              <h4>
                {new Intl.NumberFormat("ru", {
                  maximumFractionDigits: 0,
                }).format(item.price * item.count)}
                ₽
              </h4>
            </div>
            <div className="container_nav">
              <button onClick={() => onChangeDelete()}>
                <img className="icon" src={trashImg} alt="trash_img" />
              </button>
              <button>
                <img className="icon" src={favoriteImg} alt="favorite_img" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container_adaptive_nav">
        <div className="container_price">
          <h4>
            {new Intl.NumberFormat("ru", {
              maximumFractionDigits: 0,
            }).format(item.price * item.count)}
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
    </div>
  );
};

export default BasketProductCard;
