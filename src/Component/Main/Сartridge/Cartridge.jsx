import "./Cartridge.css";
import lineCartridgeImg from "../../../../public/img/image 13.png";

const Cartridge = () => {
  return (
    <section className="section_cartridge">
      <div className="container_cartridge">
        <div className="container_title">
          <div className="title">
            <h2>
              Поддерживает картриджи линейки 
            </h2>
          </div>
        </div>
        <div className="container_line_cartridge">
          <img src={lineCartridgeImg} alt="line_cartridge_img" />
          <p>
            Широкий выбор картриджей (0.6Ω–1.2Ω) для любого стиля парения — от
            мощных облаков до лёгкой затяжки. Полная совместимость с Xros
            Pro/3/Nano.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cartridge;
