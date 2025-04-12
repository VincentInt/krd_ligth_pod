import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout/Layout.jsx";
import MainPage from "../Page/MainPage/MainPage.jsx";
import ProductsPage from "../Page/ProductsPage/ProductsPage.jsx";

const Router = () => {
  return (
    <BrowserRouter basename="/krd_ligth_pod">
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="products/:type" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
