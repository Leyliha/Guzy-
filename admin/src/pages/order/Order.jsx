import { Link, useLocation } from "react-router-dom";
import "../product/product.css";
import Chart from "../../comps/chart/Chart";
import { Publish } from "@material-ui/icons";
import { productData } from "../../dummyData";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateOrder } from "../../redux/apiCalls";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
export default function Order({ productData }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  if (typeof window !== "undefined") {
    injectStyle();
  }
  const product = useSelector((state) =>
    state.order.orders.find((product) => product._id === productId)
  );

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs };
    updateOrder(productId, product, dispatch);
    toast("Order updated!");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Order</h1>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productInfoKey">username:</span>
            <span className="productName">{product.userName}</span>
          </div>
          <div className="productInfoTop">
            <span className="productInfoKey">email:</span>
            <span className="productName">{product.email}</span>
          </div>
          <div className="productInfoTop">
            <span className="productInfoKey">phone:</span>
            <span className="productName">{product.phone}</span>
          </div>
          <div className="productInfoTop">
            <span className="productInfoKey">payment:</span>
            <span className="productName">{product.payment}</span>
          </div>
          <div className="productInfoTop">
            <span className="productInfoKey">delType:</span>
            <span className="productName">{product.delType}</span>
          </div>
          <div className="productInfoTop">
            <span className="productInfoKey">address:</span>
            <span className="productName">{product.address[0]?.city}, {product.address[0]?.street}, {product.address[0]?.house || product.address[0]?.app} </span>
          </div>
          <div className="productInfoTop">
            <span className="productInfoKey">status:</span>
            <span className="productName">{product.status}</span>
          </div>
          <div className="productInfoTop">
            <span className="productInfoKey">quantity:</span>
            <span className="productName">{product.quantity}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
          </div>
        </div>
        <div className="productTopRight productInfoTop center">
          <p className="productName">
            {product.productId.map((item) => (
              <>
                <p>Title: {item.name}</p>
                <p>Quantity: {item.qty}</p>                
              </>
            ))}
          </p>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm d-flex">
          <div className="productFormLeft ">
            <label>User Name</label>
            <input
              type="text"
              name="userName"
              value={inputs.userName}
              onChange={handleChange}
            />
            <label>User Email</label>
            <input
              type="text"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <label>User Phone</label>
            <input
              type="text"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
            />
            <label>User Payment Type</label>
            <input
              type="text"
              name="payment"
              value={inputs.payment}
              onChange={handleChange}
            />
            <label>User Delivery Type</label>
            <input
              type="text"
              name="delType"
              value={inputs.delType}
              onChange={handleChange}
            />
            <label>User Address</label>
            <input
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleChange}
            />
            <button onClick={handleClick} className="productButton">
              Update
            </button>
          </div>
          <ToastContainer/>
          <div className="productFormRight1">
            <label>User Status</label>
            <select name="status" value={inputs.status} onChange={handleChange}>
              <option value="Новый">Новый</option>
              <option value="В обработке">В обработке</option>
              <option value="Сформирован">Сформирован</option>
              <option value="Отправлен">Отправлен</option>
              <option value="Доставлен">Доставлен</option>
              <option value="Отменен">Отменен</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
