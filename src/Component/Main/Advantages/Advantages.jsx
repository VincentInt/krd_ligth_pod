import "./Advantages.css";
import { advantagesData } from "./data/advantagesData";

const Advantages = () => {
  return (
    <section className="section_advantages">
      <div className="container_advantages">
        <div className="container_title">
          <div className="title">
            <div className="gradient_text">
              <h2>1200 мАч</h2>
            </div>
            <h2>
              Огромный запас для вас
            </h2>
          </div>
        </div>
        <div className="container_advantages_items">
          {advantagesData.map((item, index) => {
            return (
              <div key={index} className="advantages_item">
                <div className="advantages_card">
                  <img src={item.img} alt="advantages_img" />
                  <div className="gradient_text">
                    <h4>{item.cardText}</h4>
                  </div>
                </div>
                <div className="advantages_text">
                  <p>{item.advantagesText}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
