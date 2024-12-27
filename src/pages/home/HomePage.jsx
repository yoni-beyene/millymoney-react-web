import Home from "../../components/home/Home";
import Header from "../../components/shared/header/Header";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home-container">
      <Header activeTab="home" />
      <Home />
    </div>
  );
};

export default HomePage;
