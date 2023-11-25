import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/apiCalls";
import { userRequest } from '../../requestMethods'
export default function Chart({ title, data, dataKey, grid }) {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    getOrder(dispatch);
  }, [dispatch]);
  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const getOrders = async () => {
  //     try {
  //       const res = await userRequest.get("/api/order/?new=new");
  //       setOrders(res.data);
  //     } catch(e) {
  //       console.log(e)
  //     }
  //   };
  //   getOrders();
  // }, []);
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={orders}>
          <XAxis dataKey='userName' stroke="#5550bd" />
          <Line
            type="monotone"
            dataKey="sum"
            stroke="#5550bd"
          />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
