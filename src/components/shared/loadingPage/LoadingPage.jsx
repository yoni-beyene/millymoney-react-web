import "./LoadingPage.scss";
import logo from "../../../assets/images/logo.png";

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div id="loading-wrapper">
        <img src={logo} alt="Mill Money Logo" id="loading-text" />
        <div id="loading-content"></div>
      </div>
    </div>
  );
};
export default LoadingPage;
