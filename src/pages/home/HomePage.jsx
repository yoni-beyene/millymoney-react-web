import Home from "../../components/home/Home";
import Header from "../../components/shared/header/Header";
import "./HomePage.scss";
import TransferMoney from "../../components/home/TransferMoney";
import { useDispatch, useSelector } from "react-redux";
import { sendMoneyAction } from "../../store/action/sendMoneyAction";
import PaymentReview from "../../components/home/PaymentReview";

const HomePage = () => {
  const homeContent = useSelector((state) => state.sendeMoney.homeContent);
  const dispatch = useDispatch();
  const setHomeContent = (value) => {
    dispatch({
      type: sendMoneyAction.UPDATE_HOME_PAGE_CONTENT,
      value: value,
    });
  };

  return (
    <div className="home-container">
      <Header activeTab="home" />
      {homeContent === "default" ? (
        <Home setHomeContent={setHomeContent} />
      ) : homeContent === "transferMoney" ? (
        <TransferMoney setHomeContent={setHomeContent} />
      ) : (
        <PaymentReview setHomeContent={setHomeContent} />
      )}
    </div>
  );
};

export default HomePage;
