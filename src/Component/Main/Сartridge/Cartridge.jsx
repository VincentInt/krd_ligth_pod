import "./Cartridge.css";
import lineCartridgeImg from "../../../img/image 13.png";
import cartridgeImg from "../../../img/image 14.png";

const Cartridge = () => {
  return (
    <section className="section_cartridge">
      <div className="container_cartridge">
        <div className="container_title">
          <div className="title">
            <h3>
              Поддерживает картриджи линейки <span>Xros Pro/3/Nano</span>
            </h3>
          </div>
        </div>
        <div className="container_line_cartridge">
          <img src={lineCartridgeImg} alt="line_cartridge_img" />
          <h6>
            Картриджи поддерживают сопротивления 0.6Ω, 0.8Ω, 1.0Ω, 1.2Ω что
            позволяет выбрать идеальный режим парения — от плотных облаков до
            мягкой сигаретной затяжки. Совместимы со всей линейкой Xros Pro/3/
            Nano
          </h6>
        </div>
        <div className="container_info_cartridge">
          <img src={cartridgeImg} alt="cartridge_img" />
          <p>
            Новые картриджи Xros Pro сочетают в себе передовые технологии и
            удобство. Они оснащены Mesh-нагревателем для яркого вкуса и плотного
            пара, а также Anti-Leak системой, которая предотвращает протекание.
            они обеспечивают простую заправку через Top-Filling и долгий срок
            службы — до 3 недель. Стильный дизайн и надёжность делают их
            идеальным выбором для любого вейпера.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cartridge;
