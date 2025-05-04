import "./Favorite.css";
import dataProducts from "../../../public/data/dataProducts.json";
import { useEffect, useState } from "react";
import FavoriteCard from "./FavoriteCard/FavoriteCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Favorite = () => {
  const navigate = useNavigate();

  const favorite = useSelector((state) => state.favoriteReducer.favorites);
  const [stateFavorites, setStateFavorites] = useState([]);

  useEffect(() => {
    const favoriteProducts = favorite.map((item) => {
      return {
        ...dataProducts[item.typeProducts].find(
          (findItem) => findItem.id === item.id
        ),
        typeProducts: item.typeProducts,
      };
    });
    setStateFavorites(favoriteProducts);
  }, [favorite]);

  return (
    <section className="section_favorite">
      <div className="container_favorite">
        <h2>Избранное</h2>
        <div className="container_cards">
          {stateFavorites.length > 0 ? (
            stateFavorites?.map((item, index) => {
              return <FavoriteCard key={index} item={item} />;
            })
          ) : (
            <div className="container_clear_favorite">
              <h5>В избранном пусто</h5>
              <button onClick={() => navigate(-1)}>
                <h6>Вернуться</h6>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Favorite;
