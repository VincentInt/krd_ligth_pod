import infoImg from "../../../../public/img/icon/icons8-о-нас-24.png";
import favoriteImg from "../../../../public/img/icon/icons8-червы-24.png";
import basketImg from "../../../../public/img/icon/icons8-корзина-2-24.png";

const dataLinksHeader = {
  headerBtn: [
    { path: "/aboutus", img: infoImg, name: "О нас" },
    { path: "/favorites", img: favoriteImg, name: "Избранное" },
    { path: "/basket", img: basketImg, name: "Корзина" },
  ],
  productsBtn: [
    {
      type: "disposablePods",
      path: "/products/disposablePods",
      name: "Одноразовые",
    },
    { type: "podSystems", path: "/products/podSystems", name: "Под-системы" },
    { type: "eLiquids", path: "/products/eLiquids", name: "Жидкости" },
  ],
};

export default dataLinksHeader;
