import LoginPage from "../pages/login/LoginPage";
import WelcomePage from "../pages/welcomePage/WelcomePage";
import { createBrowserRouter } from "react-router-dom";

const RouteList = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
    errorElement: (
      <div
        className="d-flex flex-column justify-content-between"
        style={{ height: "100vh" }}
      >
        <h1>ERROR happend</h1>
      </div>
    ),
  },
]);

export default RouteList;
