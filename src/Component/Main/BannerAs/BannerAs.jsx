import "./BannerAs.css";
import xrosAssortImg from "../../../../public/img/image 16.png";

const BannerAs = () => {
  return (
    <section className="section_banner_as">
      <div className="container_banner_as">
        <div>
          <h3>
            Не теряй время <br /> на поиск <span> XROS PRO</span>
          </h3>
          <button>XROS PRO</button>
        </div>
        <img src={xrosAssortImg} alt="xros_assort_img" />
      </div>
    </section>
  );
};

export default BannerAs;
