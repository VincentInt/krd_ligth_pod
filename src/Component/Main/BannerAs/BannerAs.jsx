import "./BannerAs.css";
import xrosAssortImg from "../../../../public/img/image 16.png";
import { Link } from "react-router";

const BannerAs = () => {
  return (
    <section className="section_banner_as">
      <div className="container_banner_as">
        <div>
          <h2>
            Не теряй время <br /> на поиск <span> XROS PRO</span>
          </h2>
          <Link>
            <h6>Подробнее</h6>
          </Link>
        </div>
        <img src={xrosAssortImg} alt="xros_assort_img" />
      </div>
      <div className="container_banner_as_adaptive">
        <h2>
          Не теряй время <br /> на поиск <span> XROS PRO</span>
        </h2>
        <img src={xrosAssortImg} alt="xros_assort_img" />
        <Link to={"/products/podSystems/fullName=xros%20pro"}>
          <h6>Подробнее</h6>
        </Link>
      </div>
    </section>
  );
};

export default BannerAs;
