import { Outlet } from "react-router";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
