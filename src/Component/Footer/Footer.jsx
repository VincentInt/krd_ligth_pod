import "./Footer.css";
import logoImg from "../../../public/img/Logo.png";
import telegramIconImg from "../../../public/img/icon/image 18.png";
import phoneIconImg from "../../../public/img/icon/image 19.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer>
      <div className="container_footer">
        <div className="item_footer">
          <img className="logo_footer" src={logoImg} alt="logo_img" />
          <h6>
            *Сайт является информационным и не выполняет функции купле продажи,
            а предназначен для демонстрации практических умений в создании веб
            сайтов
          </h6>
        </div>
        <div className="item_footer">
          <div className="container_links">
            <Link to={"products/disposablePods"}>
              <h6>Одноразовые</h6>
            </Link>
            <Link to={"products/podSystems"}>
              <h6>Под-системы</h6>
            </Link>
            <Link to={"products/eLiquids"}>
              <h6>Жидкости</h6>
            </Link>
            <Link to={"/"}>
              <h6>Xros-Pro</h6>
            </Link>
            <Link to={"products/contact"}>
              <h6>Контакты</h6>
            </Link>
          </div>
          <div className="container_contact">
            <a href="#">
              <img src={telegramIconImg} alt="telegram_link_img" />
              https://t.me/USLISHAL_ZOV
            </a>
            <a href="#">
              <img src={phoneIconImg} alt="telegram_link_img" />
              +7 918 988 777
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
