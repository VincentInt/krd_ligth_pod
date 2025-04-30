import "./BannerAd.css";
import xrosProImg from "../../../../public/img/Intersect(1) (2) 2.png";
import { Link } from "react-router";

const BannerAd = () => {
  return (
    <section className="section_banner_ad">
      <div className="container_banner_ad">
        <img src={xrosProImg} alt="xros_pro_banner_img" />
        <div className="container_text_banner_ad">
          <h3>Успей забрать первым</h3>
          <div className="container_price">
            <h4>Всего за:</h4>
            <Link to={"/products/podSystems/price=4590"}>
              <h4>4 590₽</h4>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerAd;
