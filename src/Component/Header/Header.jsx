import "./Header.css";
import HeaderContent from "./HeaderContent/HeaderContent";
import HeaderBurger from "./HeaderBurger/HeaderBurger";
import { useEffect, useRef, useState } from "react";

const Header = () => {
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
    if (window.scrollY > headerRef.current.offsetHeight + 150) {
      headerFixedRef.current.style.top = "0px";
    }
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
      }, 200);
    }
  };
  useEffect(() => {
    if (dropHeader.status) {
      dropBurgerMenuRef.current.style.display = "block";
      dropBurgerMenuRef.current.style.opacity = "100%";
      dropBurgerMenuRef.current.style.top = `${headerRef.current.offsetHeight}px`;
      dropBurgerMenuRef.current.children[0].style.transform = "translateX(0%)";

      document.body.style.overflowY = "hidden";
    } else if (
      Object.keys(dropHeader.click).length === 0 ||
      dropHeader?.click?.target == dropBurgerMenuRef.current ||
      dropHeader.status
    ) {
      dropBurgerMenuRef.current.children[0].style.transform =
        "translateX(100%)";
      dropBurgerMenuRef.current.style.opacity = "0%";
      setTimeout(() => {
        dropBurgerMenuRef.current.style.display = "none";
        document.body.style.overflowY = "scroll";
      }, 200);
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
        setDropHeader={setDropHeader}
      />
    </>
  );
};

export default Header;
