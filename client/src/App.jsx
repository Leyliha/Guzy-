import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Main from "./components/main/Main";
import Order from "./components/order/Order";
import Login from "./components/auth/Login";
import ReviewList from "./components/review/ReviewList";
import Menu from "./components/menu/Menu";
import Success from "./components/order/Success";
import StripeProcessing from "./components/stripe/StripeProcessing";
import ErrorPage from "./components/order/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/order/:type", element: <Order /> },
      { path: "/login", element: <Login /> },
      { path: "/reviews", element: <ReviewList /> },
      { path: "/menu", element: <Menu /> },
      { path: "/processing", element: <StripeProcessing /> },
      { path: "/success", element: <Success /> },
      { path: "/error", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
