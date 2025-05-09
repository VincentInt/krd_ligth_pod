import { useEffect, useState } from "react";
import Basket from "../../Component/Basket/Basket";
import WindowOrderRegistration from "../../Component/WindowOrderRegistration/WindowOrderRegistration";
import { useDispatch } from "react-redux";
import { editScrollState } from "../../store/scrollStateSlice/scrollStateSlice";

const BasketPage = () => {
  const dispatch = useDispatch();
  const editScrollStateReducer = editScrollState;

  const [
    statusOpenWindowOrderRegistration,
    setStatusOpenWindowOrderRegistration,
  ] = useState(false);

  useEffect(() => {
    dispatch(
      editScrollStateReducer({
        modalWindows: !statusOpenWindowOrderRegistration,
      })
    );
  }, [statusOpenWindowOrderRegistration]);
  return (
    <>
      {statusOpenWindowOrderRegistration ? (
        <WindowOrderRegistration
          setStatusOpenWindowOrderRegistration={
            setStatusOpenWindowOrderRegistration
          }
        />
      ) : (
        ""
      )}

      <Basket
        setStatusOpenWindowOrderRegistration={
          setStatusOpenWindowOrderRegistration
        }
      />
    </>
  );
};

export default BasketPage;
