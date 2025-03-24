import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { RouterProvider } from "react-router-dom";
import RouteList from "./route/RouteList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DownloadAppPage from "./pages/shared/DownloadAppPage";

const isMobileOrTablet = () => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

function App() {
  if (isMobileOrTablet()) {
    return <DownloadAppPage />;
  } else {
    return (
      <>
        <ToastContainer />
        <RouterProvider router={RouteList} />
      </>
    );
  }
}

export default App;
