import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button/Button";
import "./ModalWindow.css";
import { useEffect, useState } from "react";
import { getCookie } from "../../store/cookieSlice/cookieSlice";

const ModalWindow = () => {
  const dispatch = useDispatch();
  const cookieSelector = useSelector((state) => state.cookieReducer.cookie);

  const [modalWindowOpen, setModalWindowOpen] = useState();

  useEffect(() => {
    setModalWindowOpen(() =>
      typeof cookieSelector?.adult === "boolean" ? !cookieSelector?.adult : true
    );
  }, []);
  useEffect(() => {
    if (modalWindowOpen) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.body.style.overflowY = "hidden";
      }, 0);
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [modalWindowOpen]);

  function onChangeBtn(bool) {
    document.cookie = JSON.stringify({
      adult: bool,
    });
    setModalWindowOpen(false);
    dispatch(getCookie());
  }
  return (
    <>
      {modalWindowOpen ? (
        <section className="section_modal_window">
          <div className="modal_window">
            <h3>Вам есть +18 лет?</h3>
            <div className="container_btn">
              <Button
                onClick={() => onChangeBtn(true)}
                style={{ border: "2px solid black" }}
              >
                Да
              </Button>
              <Button
                onClick={() => onChangeBtn(false)}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid black",
                }}
              >
                Нет
              </Button>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default ModalWindow;
