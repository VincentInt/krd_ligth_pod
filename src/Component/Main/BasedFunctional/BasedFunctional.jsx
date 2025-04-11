import "./BasedFunctional.css";
import { dataFunctionals } from "./data/dataFunctionals";

const BasedFunctional = () => {
  return (
    <section className="section_based_functional">
      <div className="container_based_functional">
        <div className="container_title">
          <h3>Vaporesso XROS PRO</h3>
          <h3 className="gradient">Ключевой Функционал</h3>
        </div>
        <div className="container_functionals">
          {dataFunctionals.map((item, index) => {
            return (
              <div key={index} className="item_functional">
                <img src={item.img} alt={`functional_${item.title}_img`} />
                <div className="container_text">
                  <h4>{item.title}</h4>
                  <h6>{item.text}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BasedFunctional;
