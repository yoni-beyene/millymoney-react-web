import Header from "../../components/shared/header/Header";
import "./HomePage.scss";
import TransferMoney from "../../components/home/TransferMoney";

const TransferMoneyPage = () => {
  return (
    <div className="home-container">
      <Header activeTab="home" />
      <TransferMoney />
    </div>
  );
};

export default TransferMoneyPage;
