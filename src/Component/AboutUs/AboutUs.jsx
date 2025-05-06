import "./AboutUs.css";
import telegramImg from "../../../public/img/icon/icons8-телеграм-50.png";
import phoneImg from "../../../public/img/icon/icons8-телефон-50.png";

const AboutUs = () => {
  return (
    <section className="section_about_us">
      <div className="container_about_us">
        <h2>О нас</h2>
        <div className="container_text">
          <div className="container_slogan">
            <h3 className="text_slogan">
              Лучшие вейпы и жидкости в Краснодаре
            </h3>
            <h4>
              <span>KrdLightPod</span> – это ваш надежный магазин вейпов, подов
              и жидкостей в Краснодаре. Мы предлагаем только качественные и
              проверенные товары, чтобы сделать ваш выбор простым, а покупку –
              приятной
            </h4>
          </div>
          <div className="container_list_advantages">
            <h3>Почему выбирают нас?</h3>
            <div className="item_list">
              <h4>🔥</h4>
              <h4>
                Широкий ассортимент – У нас есть всё: от мощных модов до удобных
                под-систем и вкуснейших жидкостей на любой вкус.
              </h4>
            </div>
            <div className="item_list">
              <h4>🔥</h4>
              <h4>
                Быстрая доставка по Краснодару – Получите заказ в удобное время
                без долгого ожидания.
              </h4>
            </div>
            <div className="item_list">
              <h4>🔥</h4>
              <h4>
                Простота выбора – Четкие описания, рейтинги и помощь
                консультантов помогут подобрать идеальный вариант.
              </h4>
            </div>
            <div className="item_list">
              <h4>🔥</h4>
              <h4>
                Доступные цены и акции – Регулярные скидки, бонусы для
                постоянных клиентов и выгодные комплекты.
              </h4>
            </div>
          </div>
          <div className="container_target">
            <h3>Наша цель</h3>
            <h4>
              Мы не просто продаем вейпы – мы помогаем вам наслаждаться
              качественным паром без лишних хлопот. Наша команда всегда на
              связи, чтобы ответить на вопросы и помочь с выбором.
            </h4>
          </div>
          <div className="container_contact">
            <h3>Наши контакты</h3>
            <div className="container_links">
              <a href="https://t.me/USLISHAL_ZOV">
                <img src={telegramImg} alt="telegram_img" />
                <h4>USLISHAL_ZOV</h4>
              </a>
              <a href="tel:+7 918 988 777">
                <img src={phoneImg} alt="phone_img" />
                <h4>+7 918 988 777</h4>
              </a>
            </div>
          </div>
          <div className="container_warning">
            <h3>Предупреждение</h3>
            <div className="warning">
              <h4>
                Этот сайт создан исключительно в тестовых целях для демонстрации
                навыков веб-разработки и размещён на GitHub.
              </h4>
              <div className="container_list">
                <div className="item_list">
                  <h4>🔹</h4>
                  <h4>Здесь нет реальных продаж.</h4>
                </div>
                <div className="item_list">
                  <h4>🔹</h4>
                  <h4> Все товары и цены – примеры.</h4>
                </div>
                <div className="item_list">
                  <h4>🔹</h4>
                  <h4> Функции заказа и оплаты не работают.</h4>
                </div>
              </div>
              <h4>
                Сайт служит учебным проектом и не связан с реальным магазином.
                Если вы заинтересованы в сотрудничестве или разработке подобного
                сайта – свяжитесь с автором через
                <a href="https://t.me/USLISHAL_ZOV">Telegram</a>.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
