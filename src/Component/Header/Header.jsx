import "./Header.css";
import HeaderContent from "./HeaderContent/HeaderContent";
import HeaderBurger from "./HeaderBurger/HeaderBurger";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

const Header = ({ setStateBodyOverflow }) => {
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
  }, []);
  window.onscroll = () => {
    if (window.scrollY > headerRef.current.offsetHeight * 4) {
      headerFixedRef.current.style.top = "0px";
    } else {
      headerFixedRef.current.style.top = "-100%";
    }
  };
  window.onresize = () => {
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
  };
  useEffect(() => {
    if (dropHeader.status) {
      dropBurgerMenuRef.current.style.display = "block";
      dropBurgerMenuRef.current.style.opacity = "100%";
      dropBurgerMenuRef.current.children[0].style.transform = "translateX(0%)";
      setStateBodyOverflow((prev) => ({ ...prev, header: "hidden" }));
    } else if (
      Object.keys(dropHeader.click).length === 0 ||
      dropHeader.click?.target == dropBurgerMenuRef.current ||
      dropHeader.status
    ) {
      dropBurgerMenuRef.current.children[0].style.transform =
        "translateX(100%)";
      dropBurgerMenuRef.current.style.opacity = "0%";
      dropBurgerMenuRef.current.style.display = "none";
      setStateBodyOverflow((prev) => ({ ...prev, header: "scroll" }));
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
