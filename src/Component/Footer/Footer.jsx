import "./Footer.css";
import logoImg from "../../img/Logo.png";
import telegramIconImg from "../../img/icon/image 18.png";
import phoneIconImg from "../../img/icon/image 19.png";
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
            <Link to={""}>Одноразовые</Link>
            <Link to={""}>Под-системы</Link>
            <Link to={""}>Жидкости</Link>
            <Link to={""}>Xros-Pro</Link>
            <Link to={""}>Контакты</Link>
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
