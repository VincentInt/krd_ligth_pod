import { useEffect, useState } from "react";
import "./ProductCard.css";
import { useSelector } from "react-redux";

const ProductCard = ({ item }) => {
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
  return (
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
          <h5 className="text_price">
            {new Intl.NumberFormat("ru", {
              maximumFractionDigits: 0,
            }).format(item.price)}
            ₽
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
