import Dashboard from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import VerificationPage from "../pages/verificationPage/VerificationPage";
import { createBrowserRouter } from "react-router-dom";

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
        path: "/dashboard",
        element: <Dashboard />,
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
