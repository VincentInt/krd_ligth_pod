import "./WindowOrderRegistration.css";
import Input from "../../UI/Input/Input";
import RadioInput from "../../UI/RadioInput/RadioInput";
import { useEffect, useRef, useState } from "react";
import dataPointShop from "./data/dataPointShop";
import dataProducts from "../../../public/data/dataProducts.json";
import { btnsPaymentMethod, btnsPlaceOfReceipt } from "./data/dataBtns";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "../../store/basketSlice/basketSlice";

const WindowOrderRegistration = ({ setStatusOpenWindowOrderRegistration }) => {
  const dispatch = useDispatch();

  const basketSelector = useSelector((state) => state.basketReducer.basket);

  const clearBasketReducer = clearBasket;

  const [formOrderRegistration, setFormOrderRegistration] = useState({
    fullName: "",
    name: "",
    communicatePhone: "",
    methodPayed: [
      { name: "СПБ", phone: "" },
      { name: "Картой", number: "", ccv: "", deadline: "" },
      { name: "Наличкой" },
    ],
    promo: "",
  });

  const [statusSendError, setStatusSendError] = useState(false);
  const [statusClickSend, setStatusClickSend] = useState(false);

  const [statePlaceOfReceiptMethod, setStatePlaceOfReceiptMethod] = useState(
    btnsPlaceOfReceipt[0].name
  );
  const [statePaymentMethod, setStatePaymentMethod] = useState(
    btnsPaymentMethod[0].name
  );
  const [statePlaceOfReceipt, setStatePlaceOfReceipt] = useState(0);

  const windowOrderRegistrationRef = useRef(null);

  useEffect(() => {
    if (statusClickSend) {
      let statusSend = true;
      for (const key in formOrderRegistration) {
        const elem = formOrderRegistration[key];
        if (key === "communicatePhone") {
          if (elem.length !== 18) {
            statusSend = false;
            setStatusClickSend(false);
            setStatusSendError(true);
            break;
          }
        } else if (key === "methodPayed") {
          const indexFind = elem.findIndex(
            (itemFind) => itemFind.name === statePaymentMethod
          );

          if (elem[indexFind].name === "СПБ") {
            if (elem[indexFind].phone.length !== 18) {
              statusSend = false;
              setStatusClickSend(false);
              setStatusSendError(true);
              break;
            }
          } else if (elem[indexFind].name === "Картой") {
            if (
              elem[indexFind].number.length !== 19 ||
              elem[indexFind].ccv.length !== 3 ||
              elem[indexFind].deadline.length !== 5
            ) {
              statusSend = false;
              setStatusClickSend(false);
              setStatusSendError(true);
              break;
            }
          }
        } else if (key !== "promo") {
          if (elem.length === 0) {
            statusSend = false;
            setStatusClickSend(false);
            setStatusSendError(true);
            break;
          }
        }
      }
      if (statusSend) {
        dispatch(clearBasketReducer());
        setStatusClickSend(false);
        setStatusOpenWindowOrderRegistration(false);
      }
    }
  }, [statusClickSend]);

  function onChangeInputs(value, type, typePay) {
    setFormOrderRegistration((prev) => {
      const clone = { ...prev };
      if (type === "methodPayed") {
        const indexFind = clone.methodPayed.findIndex(
          (itemFind) => itemFind?.name === statePaymentMethod
        );
        if (indexFind !== -1) {
          clone.methodPayed[indexFind][typePay] = value;
        }
      } else {
        clone[type] = value;
      }
      return clone;
    });
    return value;
  }
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
  function onChangeNumberBankCard(event, prev) {
    const value = event?.target?.value ? event.target.value : event;

    if (!value.length) return "";

    const clone = [...value]
      .filter((item) => item !== " " && !isNaN(+item))
      .slice(0, 16)
      .map((item, index) =>
        index !== 0 && index % 4 === 0 ? " " + item : item
      )
      .join("");
    return clone;
  }
  function onChangeCCVNumberBankCard(event) {
    const value = event?.target?.value ? event.target.value : event;
    if (!value.length) return "";
    const clone = [...value]
      .filter((item) => !isNaN(item) && item !== " ")
      .slice(0, 3)
      .join("");
    return clone;
  }
  function onChangeDeadlineBankCard(event) {
    const value = event?.target?.value ? event.target.value : event;
    if (!value.length) return "";
    const clone = [...value]
      .filter((item) => !isNaN(item) && item !== " ")
      .slice(0, 4)
      .map((item, index) => (index === 2 ? "/" + item : item))
      .join("");
    return clone;
  }
  function onChangePhoneNumber(event, prev) {
    const value = event.target.value;
    const clone = [...value].filter(
      (item, index) =>
        item !== " " && !(index === 1 && item === "7") && !isNaN(+item)
    );
    const clonePrev = [...prev].filter(
      (item, index) =>
        item !== " " && !(index === 1 && item === "7") && !isNaN(+item)
    );
    const circumcisionIndex =
      clonePrev.length < clone.length ? 10 : clonePrev.length - 1;
    return clone
      .slice(0, circumcisionIndex)
      .map((item, index) => {
        switch (index) {
          case 0:
            return "+7 (" + item;
          case 2:
            return item + ") ";
          case 5:
            return item + "-";
          case 7: {
            return item + "-";
          }
          default:
            return item;
        }
      })
      .join("");
  }
  return (
    <section
      ref={windowOrderRegistrationRef}
      onClick={(e) => {
        onChangeCloseWindow(e.target);
      }}
      className="section_order_registration"
    >
      <div className="window_order_registration">
        <h3>Оформление заказа</h3>
        <div className="container_order_registration">
          <div className="container_inputs_info">
            <h4 className="title_item">Данные получателя</h4>
            <Input
              onChange={(e) => onChangeInputs(e.target.value, "fullName")}
              placeholder={"Фамилия"}
            />
            <Input
              onChange={(e) => onChangeInputs(e.target.value, "name")}
              placeholder={"Имя"}
            />
            <Input
              type={"tel"}
              inputMode="numeric"
              onChange={(e, prev) =>
                onChangeInputs(onChangePhoneNumber(e, prev), "communicatePhone")
              }
              placeholder={"Телефон для связи"}
            />
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
                      key={index}
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
                <Input
                  type={"tel"}
                  inputMode="numeric"
                  onChange={(e, prev) =>
                    onChangeInputs(
                      onChangePhoneNumber(e, prev),
                      "methodPayed",
                      "phone"
                    )
                  }
                  placeholder={"Телефон"}
                />
              ) : statePaymentMethod === "Картой" ? (
                <div className="bank_card">
                  <div className="container_info">
                    <div className="container_input">
                      <h6>Номер карты</h6>
                      <Input
                        inputMode="numeric"
                        onChange={(e, prev) =>
                          onChangeInputs(
                            onChangeNumberBankCard(e, prev),
                            "methodPayed",
                            "number"
                          )
                        }
                        placeholder={onChangeNumberBankCard(
                          "11111111111111111"
                        )}
                      />
                    </div>
                    <div className="flex_info">
                      <div className="container_input">
                        <h6>CCV</h6>
                        <Input
                          inputMode="numeric"
                          onChange={(e, prev) =>
                            onChangeInputs(
                              onChangeCCVNumberBankCard(e, prev),
                              "methodPayed",
                              "ccv"
                            )
                          }
                          placeholder={onChangeCCVNumberBankCard("123")}
                        />
                      </div>
                      <div className="container_input">
                        <h6>Срок</h6>
                        <Input
                          inputMode="numeric"
                          onChange={(e, prev) =>
                            onChangeInputs(
                              onChangeDeadlineBankCard(e, prev),
                              "methodPayed",
                              "deadline"
                            )
                          }
                          placeholder={onChangeDeadlineBankCard("1111")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : statePaymentMethod === "Наличкой" ? (
                ""
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="container_promo">
            <h4 className="title_item">Промокод</h4>
            <Input
              onChange={(e) => onChangeInputs(e.target.value, "promo")}
              placeholder={"Промокод"}
            />
          </div>
          <div className="container_result">
            <h4 className="title_item">Итого:</h4>
            <div className="result">
              {basketSelector.find((itemFind) => {
                return dataProducts[itemFind.type].find(
                  (findProducts) => findProducts.id === itemFind.id
                )?.discount;
              }) ? (
                <>
                  <h5>
                    {new Intl.NumberFormat("ru", {
                      maximumFractionDigits: 0,
                    }).format(
                      basketSelector.reduce((acc, item) => {
                        const clone = dataProducts[item.type].find(
                          (itemFind) => itemFind.id === item.id
                        );
                        return Math.floor((acc += clone.price * item.count));
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
                        return Math.floor(
                          clone.discount
                            ? (acc += clone.discount * item.count)
                            : (acc += clone.price * item.count)
                        );
                      }, 0)
                    )}
                    ₽
                  </h2>
                </>
              ) : (
                <h2>
                  {new Intl.NumberFormat("ru", {
                    maximumFractionDigits: 0,
                  }).format(
                    basketSelector.reduce((acc, item) => {
                      const clone = dataProducts[item.type].find(
                        (itemFind) => itemFind.id === item.id
                      );
                      return Math.floor((acc += clone.price * item.count));
                    }, 0)
                  )}
                  ₽
                </h2>
              )}
            </div>
          </div>
          <div className="container_send">
            {statusSendError ? <h6>Заполните анкету полностью</h6> : ""}
            <div className="container_btn_send">
              <button
                className="btn_send"
                onClick={() => setStatusClickSend(true)}
              >
                <h5>Оформить</h5>
              </button>
              <button
                onClick={() => {
                  setStatusClickSend(false);
                  setStatusOpenWindowOrderRegistration(false);
                }}
                className="btn_close"
              >
                <h5>Отмена</h5>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WindowOrderRegistration;
