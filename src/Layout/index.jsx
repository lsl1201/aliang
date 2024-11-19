
import { Outlet } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import './layout.css'


const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;