import "./ModalWindow.css";
import Button from "../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editCookie } from "../../store/cookieSlice/cookieSlice";
import { editViewModalWindow } from "../../store/modalWindowSlice/modalWindowSlice";

const ModalWindow = ({ setStateBodyOverflow }) => {
  const dispatch = useDispatch();

  const editCookieReducer = editCookie;
  const editOpenModalWindow = editViewModalWindow;

  const cookieSelector = useSelector((state) => state.cookieReducer.cookie);
  const modalWindowOpen = useSelector(
    (state) => state.modalWindowReducer.modalWindow
  );

  useEffect(() => {
    dispatch(
      editOpenModalWindow(
        typeof cookieSelector?.adult === "boolean"
          ? !cookieSelector?.adult
          : true
      )
    );
  }, []);

  useEffect(() => {
    if (typeof modalWindowOpen === "boolean") {
      if (modalWindowOpen) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setStateBodyOverflow((prev) => ({ ...prev, modalWindow: "hidden" }));
      } else {
        setStateBodyOverflow((prev) => ({ ...prev, modalWindow: "scroll" }));
      }
    }
  }, [modalWindowOpen]);

  function onChangeBtn(bool) {
    dispatch(editOpenModalWindow(false));
    dispatch(editCookieReducer({ adult: bool }));
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
                <h6>Да</h6>
              </Button>
              <Button
                onClick={() => onChangeBtn(false)}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid black",
                }}
              >
                <h6> Нет</h6>
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
