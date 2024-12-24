import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { RouterProvider } from "react-router-dom";
import RouteList from "./route/RouteList";

function App() {
  return <RouterProvider router={RouteList} />;
}

export default App;
