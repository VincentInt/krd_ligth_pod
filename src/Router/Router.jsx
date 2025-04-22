import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import MainPage from "../Page/MainPage/MainPage.jsx";
import ProductsPage from "../Page/ProductsPage/ProductsPage.jsx";
import BasketPage from "../Page/BasketPage/BasketPage.jsx";

const Router = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="products/:type/:filter?" element={<ProductsPage />} />
          <Route path="basket" element={<BasketPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
