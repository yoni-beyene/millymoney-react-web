import { useState } from "react";
import Home from "../../components/home/Home";
import Header from "../../components/shared/header/Header";
import "./HomePage.scss";
import TransferMoney from "../../components/home/TransferMoney";

const HomePage = () => {
  const [homeContent, setHomeContent] = useState("default");
  return (
    <div className="home-container">
      <Header activeTab="home" />
      {homeContent === "default" ? (
        <Home setHomeContent={setHomeContent} />
      ) : (
        <TransferMoney />
      )}
    </div>
  );
};

export default HomePage;
