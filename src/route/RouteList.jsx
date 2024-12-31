import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import RecipientPage from "../pages/recipient/RecipientPage";
import RegisterPage from "../pages/register/RegisterPage";
import StatisticsPage from "../pages/statistics/StatisticsPage";
import VerificationPage from "../pages/verificationPage/VerificationPage";
import { createBrowserRouter } from "react-router-dom";
import CardsPage from "../pages/card/CardPages";

const RouteList = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/verification",
        element: <VerificationPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/statistics",
        element: <StatisticsPage />,
      },
      {
        path: "/recipient",
        element: <RecipientPage />,
      },
      {
        path: "/card",
        element: <CardsPage />,
      },
    ],
    // errorElement: (
    //   <div
    //     className="d-flex flex-column justify-content-between"
    //     style={{ height: "100vh" }}
    //   >
    //     <h1>ERROR happend</h1>
    //   </div>
    // ),
  },
]);

export default RouteList;
