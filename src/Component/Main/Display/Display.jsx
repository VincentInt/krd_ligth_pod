import "./Display.css";
import displayImg from "../../../../public/img/image 15.png";

const Display = () => {
  return (
    <section className="section_display">
      <div className="container_display">
        <img src={displayImg} alt="new_display_img " />
        <div className="container_text">
          <div className="gradient_text">
            <h3>Новое поколение дислеев</h3>
          </div>
          <p>
            Vaporesso XROS Pro оснащен компактным монохромным экраном,
            отображающим заряд батареи, мощность, режим работы и активацию
            затяжки. Простое управление, защита от влаги и пыли, а также
            стильный дизайн обеспечивают удобство и надежность.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Display;
