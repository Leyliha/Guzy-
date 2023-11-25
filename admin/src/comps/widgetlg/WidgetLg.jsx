import "./widget.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js"
import { Link } from 'react-router-dom'
export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/api/order/?new=new");
        setOrders(res.data);
      } catch { }
    };
    getOrders();
  }, []);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <div>
        <h3 className="widgetLgTitle">Latest transactions</h3>

      </div>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Contact</th>
          <th className="widgetLgTh">Delivery</th>
          <th className="widgetLgTh">Address</th>
          <th className="widgetLgTh">Status</th>
          <th className="widgetLgTh">Details</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.userName}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">{order.phone || order.email}</td>
            <td className="widgetLgAmount">{order.delType}</td>
            <td className="widgetLgAmount">{order.address[0]?.city}, {order.address[0]?.street}, {order.address[0]?.house || order.address[0]?.app}</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
            <td>
              <Link to={"/order/" + order._id}>
                <button className="productListEdit">Edit</button>
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}