import "./BannerAd.css";
import xrosProImg from "../../../../public/img/Intersect(1) (2) 2.png";
import Button from "../../../UI/Button/Button";

const BannerAd = () => {
  return (
    <section className="section_banner_ad">
      <div className="container_banner_ad">
        <img src={xrosProImg} alt="xros_pro_banner_img" />
        <div className="container_text_banner_ad">
          <h3>Успей забрать первым</h3>
          <div className="container_price">
            <h3>4 890₽</h3>
            <Button>Подробнее</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerAd;
