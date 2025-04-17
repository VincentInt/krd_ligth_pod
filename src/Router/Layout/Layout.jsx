import { Outlet } from "react-router";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import ModalWindow from "../../Component/ModalWindow/ModalWindow";
const Layout = () => {
  return (
    <>
      <ModalWindow />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
