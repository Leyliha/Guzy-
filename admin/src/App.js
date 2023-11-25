import Topbar from "./comps/topbar/Topbar";
import Sidebar from "./comps/sidebar/Sidebar";
import Home from "./pages/home/Home";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NewCategory from "./pages/newCategory/NewCategory";
import ProductList from "./pages/productList/ProductList";
import CategoryList from "./pages/categoryList/CategoryList";
import OrderList from "./pages/orderList/OrderList";
import Product from "./pages/product/Product";
import Category from "./pages/category/category";
import Order from "./pages/order/Order";
import NewProduct from "./pages/newProduct/NewProduct";

import Login from "./pages/login/Login";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function App() {
  //const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin
  const admin = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Router>
        <Topbar admin={admin} />
        <div className={admin ? "container" : "container1"}>
          {admin ? <Sidebar /> : <div className="cin"><Link to="/login">Please Log In!</Link></div>}
          <Routes>
            {admin ? (
              <>
                <Route
                  exact
                  path="/"
                  {...(admin ? <Navigate to="/login" /> : <Navigate to="/" />)}
                  element={<Home />}
                ></Route>
                <Route
                  exact
                  path="/newProduct"
                  element={<NewProduct />}
                ></Route>
                <Route
                  exact
                  path="/newCategory"
                  element={<NewCategory />}
                ></Route>
                <Route
                  exact
                  path="/product/:productId"
                  element={<Product />}
                ></Route>
                <Route
                  exact
                  path="/category/:categoryId"
                  element={<Category />}
                ></Route>
                <Route exact path="/order/:orderId" element={<Order />}></Route>
                <Route
                  exact
                  path="/products"
                  element={<ProductList />}
                ></Route>
                <Route
                  exact
                  path="/categories"
                  element={<CategoryList />}
                ></Route>
                <Route exact path="/orders" element={<OrderList />}></Route>
              </>
            ) : (
              <Route exact path="/login" element={<Login />} />
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
