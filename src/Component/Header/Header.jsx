import "./Header.css";
import logoImg from "../../../public/img/Logo.png";
import burgerMenuImg from "../../../public/img/icon/icons8-гамбургер-меню-50.png";
import { Link } from "react-router";
import { useEffect, useRef } from "react";

const Header = () => {
  const headerRef = useRef(null);
  const headerFixedRef = useRef(null);
  const dropBurgerMenuRef = useRef(null);

  useEffect(() => {
    if (window.scrollY > headerRef.current.offsetHeight + 150) {
      headerFixedRef.current.style.top = "0px";
    }
  }, []);

  function onClickDropBurgerMenu(click, statusBtn) {
    if (
      dropBurgerMenuRef.current.style.display === "none" ||
      !dropBurgerMenuRef.current.style.display
    ) {
      dropBurgerMenuRef.current.style.display = "block";
      dropBurgerMenuRef.current.style.opacity = "100%";
      dropBurgerMenuRef.current.style.top = `${headerRef.current.offsetHeight}px`;
      dropBurgerMenuRef.current.children[0].style.transform = "translateX(0%)";

      document.body.style.overflowY = "hidden";
    } else if (click.target == dropBurgerMenuRef.current || statusBtn) {
      dropBurgerMenuRef.current.children[0].style.transform =
        "translateX(100%)";
      dropBurgerMenuRef.current.style.opacity = "0%";
      setTimeout(() => {
        dropBurgerMenuRef.current.style.display = "none";
        document.body.style.overflowY = "scroll";
      }, 200);
    }
  }

  window.onscroll = () => {
    if (window.scrollY > headerRef.current.offsetHeight * 4) {
      headerFixedRef.current.style.top = "0px";
    } else {
      headerFixedRef.current.style.top = "-71px";
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
  return (
    <>
      <header ref={headerRef}>
        <div className="container_header">
          <div className="logo">
            <img src={logoImg} alt="logo_img" />
          </div>
          <div className="container_links">
            <Link to={"products/disposablePods"}>
              <h6>Одноразовые</h6>
            </Link>
            <Link to={"products/podSystems"}>
              <h6>Под-системы</h6>
            </Link>
            <Link to={"products/eLiquids"}>
              <h6>Жидкости</h6>
            </Link>
            <Link to={"/"}>
              <h6>Xros-Pro</h6>
            </Link>
            <Link to={"products/contact"}>
              <h6>Контакты</h6>
            </Link>
          </div>
          <div className="burger_menu">
            <button
              onClick={(e) => onClickDropBurgerMenu(e, true)}
              className="btn_burger_menu"
            >
              <img src={burgerMenuImg} alt="burger_menu_img" />
            </button>
          </div>
        </div>
      </header>
      <header className="header_fixed" ref={headerFixedRef}>
        <div className="container_header">
          <div className="logo">
            <img src={logoImg} alt="logo_img" />
          </div>
          <div className="container_links">
            <Link to={"products/disposablePods"}>
              <h6>Одноразовые</h6>
            </Link>
            <Link to={"products/podSystems"}>
              <h6>Под-системы</h6>
            </Link>
            <Link to={"products/eLiquids"}>
              <h6>Жидкости</h6>
            </Link>
            <Link to={'/'}>
              <h6>Xros-Pro</h6>
            </Link>
            <Link to={"products/contact"}>
              <h6>Контакты</h6>
            </Link>
          </div>
          <div className="burger_menu">
            <button
              onClick={(e) => onClickDropBurgerMenu(e, true)}
              className="btn_burger_menu"
            >
              <img src={burgerMenuImg} alt="burger_menu_img" />
            </button>
          </div>
        </div>
      </header>
      <div
        ref={dropBurgerMenuRef}
        onClick={onClickDropBurgerMenu}
        className="container_drop_burger_menu"
      >
        <div className="drop_burger_menu">
          <Link to={"products/disposablePods"}>
            <h6>Одноразовые</h6>
          </Link>
          <Link to={"products/podSystems"}>
            <h6>Под-системы</h6>
          </Link>
          <Link to={"products/eLiquids"}>
            <h6>Жидкости</h6>
          </Link>
          <Link to={"/"}>
            <h6>Xros-Pro</h6>
          </Link>
          <Link to={"products/contact"}>
            <h6>Контакты</h6>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
