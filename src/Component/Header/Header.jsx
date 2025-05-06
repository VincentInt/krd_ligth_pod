import "./Header.css";
import HeaderContent from "./HeaderContent/HeaderContent";
import HeaderBurger from "./HeaderBurger/HeaderBurger";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { editScrollState } from "../../store/scrollStateSlice/scrollStateSlice";

const Header = () => {
  const dispatch = useDispatch();

  const editScrollStateReducer = editScrollState;

  const params = useParams();

  const [dropHeader, setDropHeader] = useState({ click: {}, status: false });
  const [dropCatalog, setDropCatalog] = useState(false);
  const [stateDropProducts, setStateDropProducts] = useState({
    name: "",
    value: [],
  });

  const headerRef = useRef(null);
  const headerFixedRef = useRef(null);
  const dropBurgerMenuRef = useRef(null);

  useEffect(() => {
    setDropHeader({ click: {}, status: false });
    setDropCatalog(false);
    setStateDropProducts({
      name: "",
      value: [],
    });
  }, [params]);
  useEffect(() => {
    if (window.scrollY > headerRef.current.offsetHeight + 150) {
      headerFixedRef.current.style.top = "0px";
    }
    dropBurgerMenuRef.current.style.top = `${headerRef.current.offsetHeight}px`;
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > headerRef.current.offsetHeight * 4) {
          headerFixedRef.current.style.top = "0px";
        } else {
          headerFixedRef.current.style.top = "-100%";
        }
      },
      true
    );
    window.addEventListener(
      "resize",
      () => {
        if (
          window.screen.width > 960 &&
          dropBurgerMenuRef.current.style.display === "block"
        ) {
          dropBurgerMenuRef.current.children[0].style.transform =
            "translateX(100%)";
          dropBurgerMenuRef.current.style.opacity = "0%";
          setTimeout(() => {
            dropBurgerMenuRef.current.style.display = "none";
            setDropHeader({ click: {}, status: false });
          }, 200);
        }
        dropBurgerMenuRef.current.style.top = `${headerRef.current.offsetHeight}px`;
      },
      true
    );
  }, []);

  useEffect(() => {
    const currentDropBurger = dropBurgerMenuRef.current;
    if (dropHeader.status) {
      currentDropBurger.style.display = "block";
      dispatch(editScrollStateReducer({ header: false }));
      setTimeout(() => {
        currentDropBurger.style.opacity = "100%";
        currentDropBurger.children[0].style.transform = "translateX(0%)";
      }, 0);
    } else if (
      Object.keys(dropHeader.click).length === 0 ||
      dropHeader.click?.target == currentDropBurger ||
      dropHeader.status
    ) {
      dispatch(editScrollStateReducer({ header: true }));

      currentDropBurger.children[0].style.transform = "translateX(100%)";
      currentDropBurger.style.opacity = "0%";
      setTimeout(() => {
        currentDropBurger.style.display = "none";
      }, 500);
    }
  }, [dropHeader]);
  return (
    <>
      <header className="header" ref={headerRef}>
        <HeaderContent
          stateDropProducts={stateDropProducts}
          setStateDropProducts={setStateDropProducts}
          dropCatalog={dropCatalog}
          setDropCatalog={setDropCatalog}
          setDropHeader={setDropHeader}
        />
      </header>
      <header className="header_fixed" ref={headerFixedRef}>
        <HeaderContent
          stateDropProducts={stateDropProducts}
          setStateDropProducts={setStateDropProducts}
          dropCatalog={dropCatalog}
          setDropCatalog={setDropCatalog}
          setDropHeader={setDropHeader}
        />
      </header>
      <HeaderBurger
        dropBurgerMenuRef={dropBurgerMenuRef}
        dropHeader={dropHeader}
        setDropHeader={setDropHeader}
      />
    </>
  );
};

export default Header;
