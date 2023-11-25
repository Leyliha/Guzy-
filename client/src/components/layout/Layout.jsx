import Header from "./Header";
import Footer from "./Footer";
import { Link, Outlet } from "react-router-dom";
import "../../index.css";
import { GoMoveToTop } from "react-icons/go";
import { useSelector } from "react-redux";
import { BiCartAlt } from "react-icons/bi";
import Drawer from "../cart/Drawer";
import { useState } from "react";
const Layout = () => {
  const cart = useSelector((state) => state.cart.products);
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <a href="#" className="scrolltop" id="scroll-top">
        <GoMoveToTop />
      </a>
      <Header />
      <Outlet />
      {cart.length > 0 ? (
        <button onClick={() => setIsOpen(true)}>
          <div className="fixed bottom-0 right-0 p-5 m-6 bg-[#29AB87] rounded-lg transition-all">
            <div className="relative">
              <BiCartAlt size={40} color="white" />
              <span
                className={`absolute -top-2 -right-3 text-white bg-[#393939] ${cart.length === 1 ? "px-2.5 " : "px-2"
                  } rounded-full`}
              >
                {cart.length}
              </span>
            </div>
          </div>
        </button>
      ) : (
        <div className="hidden transition-all"></div>
      )}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <Footer />
    </>
  );
};

export default Layout;
