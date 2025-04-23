import { Outlet } from "react-router";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import ModalWindow from "../../Component/ModalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { editCookie } from "../../store/cookieSlice/cookieSlice";
import { addBasket } from "../../store/basketSlice/basketSlice";

const Layout = () => {
  const dispatch = useDispatch();

  const addBasketReducer = addBasket;
  const editCookieReducer = editCookie;

  const cookieSelector = useSelector((state) => state.cookieReducer.cookie);
  const basketSelector = useSelector((state) => state.basketReducer.basket);

  useEffect(() => {
    dispatch(addBasketReducer(cookieSelector.basket));
  }, []);
  useEffect(() => {
    dispatch(editCookieReducer({ basket: basketSelector }));
  }, [basketSelector]);

  return (
    <>
      <ModalWindow />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
