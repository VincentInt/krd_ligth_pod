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
                  <h4>{item.titleText}</h4>
                </div>
              );
            })}
          </div>
        </div>
        <p>
          Vaporesso Xros Pro предлагает три режима работы для максимального
          комфорта. Eco — энергосберегающий режим с умеренным паром и
          увеличенным временем работы от батареи. Normal — стандартный режим,
          идеальный для повседневного использования с балансом мощности и
          расхода заряда. Power — мощный режим для интенсивного пара,
          подчеркивающий насыщенность вкуса и плотность облака, но с повышенным
          расходом батареи. Выбирайте подходящий режим под ваши предпочтения!
        </p>
      </div>
    </section>
  );
};

export default Modes;
