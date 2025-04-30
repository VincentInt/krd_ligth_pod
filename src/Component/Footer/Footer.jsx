import "./Footer.css";
import telegramIconImg from "../../../public/img/icon/image 18.png";
import phoneIconImg from "../../../public/img/icon/image 19.png";
import { Link } from "react-router";
import dataLinksFooter from "./data/dataLinksFooter";

const Footer = () => {
  return (
    <footer>
      <div className="container_footer">
        <nav className="container_nav">
          <div className="container_links">
            <div className="links">
              {dataLinksFooter.mainLinks.map((item, index) => {
                return (
                  <Link key={index} to={item.path}>
                    <h6>{item.name}</h6>
                  </Link>
                );
              })}
            </div>
            <div className="links">
              {dataLinksFooter.productsLinks.map((item, index) => {
                return (
                  <Link key={index} to={item.path}>
                    <h6>{item.name}</h6>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="container_links">
            <a className="a_contact" href="https://t.me/USLISHAL_ZOV">
              <img src={telegramIconImg} alt="telegram_img" />
              <h6>@USLISHAL_ZOV</h6>
            </a>
            <a className="a_contact" href="tel:7918988777">
              <img src={phoneIconImg} alt="phone_img" />
              <h6>+7 918 988 777</h6>
            </a>
          </div>
        </nav>
        <div className="container_warning">
          <h6>
            *Сайт не ранжируется по коммерческим запросам и являеться
            информационным
          </h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
