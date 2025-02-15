import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer/Footer";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
