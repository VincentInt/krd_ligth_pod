import { Outlet } from "react-router";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import ModalWindow from "../../Component/ModalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editCookie } from "../../store/cookieSlice/cookieSlice";
import { addBasket } from "../../store/basketSlice/basketSlice";
import { addFavorite } from "../../store/favoriteSlice/favoriteSlice";

const Layout = () => {
  const dispatch = useDispatch();

  const addBasketReducer = addBasket;
  const addFavoriteReducer = addFavorite;
  const editCookieReducer = editCookie;

  const cookieSelector = useSelector((state) => state.cookieReducer.cookie);
  const basketSelector = useSelector((state) => state.basketReducer.basket);
  const favoriteSelector = useSelector(
    (state) => state.favoriteReducer.favorites
  );

  const [stateBodyOverflow, setStateBodyOverflow] = useState({
    modalWindow: "scroll",
    header: "scroll",
  });

  useEffect(() => {
    dispatch(addBasketReducer(cookieSelector.basket));
    dispatch(addFavoriteReducer(cookieSelector.favorites));
  }, []);

  useEffect(() => {
    dispatch(editCookieReducer({ basket: basketSelector }));
  }, [basketSelector]);

  useEffect(() => {
    dispatch(editCookieReducer({ favorites: favoriteSelector }));
  }, [favoriteSelector]);

  useEffect(() => {
    if (
      stateBodyOverflow.modalWindow === "scroll" &&
      stateBodyOverflow.header === "scroll"
    ) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [stateBodyOverflow]);
  return (
    <>
      <ModalWindow setStateBodyOverflow={setStateBodyOverflow} />
      <Header setStateBodyOverflow={setStateBodyOverflow} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
