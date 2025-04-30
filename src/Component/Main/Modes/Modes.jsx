import "./Modes.css";
import { dataModes } from "./data/dataModes";

const Modes = () => {
  return (
    <section className="section_modes">
      <div className="container_modes">
        <h3>Удобства выбора</h3>
        <div className="container_modes_power">
          <div className="container_items_modes_power">
            {dataModes.map((item, index) => {
              return (
                <div key={index} className="item_modes_power">
                  <img src={item.img} alt="modes_power_img" />
                  <h5>{item.titleText}</h5>
                </div>
              );
            })}
          </div>
        </div>
        <p>
          Vaporesso XROS Pro предлагает три режима: Eco – экономный с умеренным
          паром, Normal – сбалансированный для повседневного использования, и
          Power – мощный для насыщенного вкуса и плотного облака. Выбирайте под
          свой стиль!
        </p>
      </div>
    </section>
  );
};

export default Modes;
