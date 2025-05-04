import "./ProductPalette.css";
import xrosNewLvlImg from "../../../../public/img/image.png";
import { dataProductLinePalette } from "./data/dataProductLinePalette";
import Button from "../../../UI/Button/Button";
import { Link } from "react-router";

const ProductPalette = () => {
  return (
    <section className="section_product_palette">
      <div className="container_product_palette">
        <div className="container_preview_product">
          <div>
            <img
              className="preview_product_img"
              src={xrosNewLvlImg}
              alt="xros_new_lvl_img"
            />
          </div>
          <div className="container_text_preview_product">
            <div>
              <h2>Vaporesso XROS PRO</h2>
              <div className="gradient_text">
                <h3>Новый уровень вейпинга</h3>
              </div>
            </div>
            <p className="p_big_text">
              С Vaporesso XROS PRO вы сможете насладиться гладким и насыщенным
              вкусом, а также оптимальным контролем над вашим процессом
              вейпинга. На сайте вы узнаете о всех преимуществах,
              характеристиках и способах использования, которые делают этот
              девайс идеальным выбором как для новичков, так и для опытных
              вейперов
            </p>
            <h6>Приготовьтесь открыть новый уровень вейпинга</h6>
          </div>
        </div>
        <div className="container_product_line">
          <div className="container_title_product_line">
            <h2>XROS PRO представлен в</h2>
            <div className="gradient_text">
              <h2>Палитре цветов</h2>
            </div>
          </div>
          <div className="container_product_line_palette">
            {dataProductLinePalette.map((item) => {
              return (
                <div className="container_item_product" key={item.id}>
                  <img src={item.img} alt={`${item.color}_xros_pro_img`} />
                  <div className="container_item_color">
                    <div
                      style={{ backgroundColor: item.color }}
                      className="color_ball"
                    ></div>
                    <h6>{item.textColor}</h6>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="container_about_product_line_palette">
            <p>
              Vaporesso XROS PRO – стильный и долговечный из алюминиевого сплава
              с эргономичным дизайном для удобного использования.
            </p>
            <div className="container_btn">
              <Link to={"products/podSystems/fullName=vaporesso%20xros%20pro"}>
                <h6>Подробнее</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPalette;
