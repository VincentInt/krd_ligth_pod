import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import MainPage from "../Page/MainPage/MainPage.jsx";
import ProductsPage from "../Page/ProductsPage/ProductsPage.jsx";
import BasketPage from "../Page/BasketPage/BasketPage.jsx";
import AboutUsPage from "../Page/AboutUsPage/AboutUsPage.jsx";
import FavoritePage from "../Page/FavoritePage/FavoritePage.jsx";

const Router = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="products/:type/:filter?" element={<ProductsPage />} />
          <Route path="basket" element={<BasketPage />} />
          <Route path="favorites" element={<FavoritePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
