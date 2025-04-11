import "./Display.css";
import displayImg from "../../../img/image 15.png";

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
            Компактный монохромный экран отображает ключевую информацию: уровень
            заряда батареи, текущую мощность, режим работы (регулируемый или
            автоматический) и индикацию активации затяжки. Инту итивное
            управление и наглядность параметров делают использование устройства
            максимально удобным. Экран защищен от пыли и влаги, сохраняя
            стильный дизайн и надежность.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Display;
