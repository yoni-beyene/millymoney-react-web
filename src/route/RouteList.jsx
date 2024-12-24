import Header from "../components/shared/header/Header";
import WelcomePage from "../pages/onboarding/WelcomePage";
import { createBrowserRouter } from "react-router-dom";

const RouteList = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <WelcomePage />,
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
