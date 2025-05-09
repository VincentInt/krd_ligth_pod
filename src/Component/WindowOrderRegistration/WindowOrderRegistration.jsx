import "./WindowOrderRegistration.css";
import Input from "../../UI/Input/Input";
import RadioInput from "../../UI/RadioInput/RadioInput";
import { useRef, useState } from "react";
import dataPointShop from "./data/dataPointShop";
import dataProducts from "../../../public/data/dataProducts.json";
import { btnsPaymentMethod, btnsPlaceOfReceipt } from "./data/dataBtns";
import { useSelector } from "react-redux";

const WindowOrderRegistration = ({ setStatusOpenWindowOrderRegistration }) => {
  const basketSelector = useSelector((state) => state.basketReducer.basket);

  const [statePlaceOfReceiptMethod, setStatePlaceOfReceiptMethod] = useState(
    btnsPlaceOfReceipt[0].name
  );
  const [statePaymentMethod, setStatePaymentMethod] = useState(
    btnsPaymentMethod[0].name
  );
  const [statePlaceOfReceipt, setStatePlaceOfReceipt] = useState(0);

  const windowOrderRegistrationRef = useRef(null);

  function onChangeCloseWindow(target) {
    if (target === windowOrderRegistrationRef.current) {
      setStatusOpenWindowOrderRegistration(false);
    }
  }
  function onChangePaymentMethod(status) {
    setStatePaymentMethod(status);
  }
  function onChangeDelivery(status) {
    setStatePlaceOfReceiptMethod(status);
  }
  function onChangeSelectPointShop(point) {
    setStatePlaceOfReceipt(point);
  }
  function onChangeNumberBankCard(value) {
    const clone = [...value]
      .filter((item) => item !== " " && !isNaN(+item))
      .slice(0, 16)
      .map((item, index) => (index % 4 === 0 ? " " + item : item))
      .join("");

    return clone;
  }
  function onChangeCCVNumberBankCard(value) {
    const clone = [...value]
      .filter((item) => !isNaN(item) && item !== " ")
      .slice(0, 3)
      .join("");
    return clone;
  }
  function onChangeDeadlineBankCard(value) {
    const clone = [...value]
      .filter((item) => !isNaN(item) && item !== " ")
      .slice(0, 4)
      .map((item, index) => (index === 2 ? "/" + item : item))
      .join("");
    return clone;
  }
  return (
    <section
      ref={windowOrderRegistrationRef}
      onClick={(e) => onChangeCloseWindow(e.target)}
      className="section_order_registration"
    >
      <div className="window_order_registration">
        <h3>Оформление заказа</h3>
        <div className="container_order_registration">
          <div className="container_inputs_info">
            <h4 className="title_item">Данные получателя</h4>
            <Input placeholder={"Фамилия"} onChange={() => {}} />
            <Input placeholder={"Имя"} onChange={() => {}} />
            <Input placeholder={"Телефон"} onChange={() => {}} />
          </div>
          <div className="container_coordinate_info">
            <h4 className="title_item">Место получение</h4>
            <div className="container_place_of_receipt">
              {btnsPlaceOfReceipt.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => onChangeDelivery(item.name)}
                    className={
                      statePlaceOfReceiptMethod === item.name
                        ? "btn_active"
                        : "btn_disable"
                    }
                  >
                    <h6>{item.name}</h6>
                  </button>
                );
              })}
            </div>
            <div className="container_point_shop">
              {statePlaceOfReceiptMethod === "Доставка" ? (
                <h6>К сожалению доставка товаров сейчас не доступна</h6>
              ) : (
                dataPointShop.map((item, index) => {
                  return (
                    <RadioInput
                      onChange={() => onChangeSelectPointShop(index)}
                      state={statePlaceOfReceipt === index}
                    >
                      <div key={index} className="item_point_shop">
                        <div>
                          <h5>{item.name}</h5>
                          <h6>
                            г {item.city} ул {item.street} д {item.houseAddress}
                          </h6>
                        </div>
                      </div>
                    </RadioInput>
                  );
                })
              )}
            </div>
          </div>
          <div className="container_pay">
            <h4 className="title_item">Способ оплаты</h4>
            <div className="container_pay_way">
              {btnsPaymentMethod.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => onChangePaymentMethod(item.name)}
                    className={
                      statePaymentMethod === item.name
                        ? "btn_active"
                        : "btn_disable"
                    }
                  >
                    <h6>{item.name}</h6>
                  </button>
                );
              })}
            </div>
            <div className="container_payment_method">
              {statePaymentMethod === "СПБ" ? (
                <Input placeholder={"E-mail"} />
              ) : statePaymentMethod === "Картой онлайн" ? (
                <div className="bank_card">
                  <div className="container_info">
                    <div className="container_input">
                      <h6>Номер карты</h6>
                      <Input
                        onChange={onChangeNumberBankCard}
                        placeholder={onChangeNumberBankCard(
                          "11111111111111111"
                        )}
                      />
                    </div>
                    <div className="flex_info">
                      <div className="container_input">
                        <h6>CCV</h6>
                        <Input
                          onChange={onChangeCCVNumberBankCard}
                          placeholder={onChangeCCVNumberBankCard("123")}
                        />
                      </div>
                      <div className="container_input">
                        <h6>Срок</h6>
                        <Input
                          onChange={onChangeDeadlineBankCard}
                          placeholder={onChangeDeadlineBankCard("1111")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : statePaymentMethod === "Наличкой при получении" ? (
                ""
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="container_promo">
            <h4 className="title_item">Промокод</h4>
            <Input placeholder={"Промокод"} onChange={() => {}} />
          </div>
          <div className="container_result">
            <h4 className="title_item">Итого:</h4>
            <div className="result">
              <h5>
                {new Intl.NumberFormat("ru", {
                  maximumFractionDigits: 0,
                }).format(
                  basketSelector.reduce((acc, item) => {
                    const clone = dataProducts[item.type].find(
                      (itemFind) => itemFind.id === item.id
                    );
                    return Math.floor((acc += clone.price));
                  }, 0)
                )}
                ₽
              </h5>
              <h2>
                {new Intl.NumberFormat("ru", {
                  maximumFractionDigits: 0,
                }).format(
                  basketSelector.reduce((acc, item) => {
                    const clone = dataProducts[item.type].find(
                      (itemFind) => itemFind.id === item.id
                    );
                    return Math.floor((acc += clone.discount));
                  }, 0)
                )}
                ₽
              </h2>
            </div>
          </div>
          <button className="btn_send">
            <h5>Оформить</h5>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WindowOrderRegistration;
