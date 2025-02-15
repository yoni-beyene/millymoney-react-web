import Header from "../../components/shared/header/Header";
import "./HomePage.scss";
import PaymentReview from "../../components/home/PaymentReview";

const PaymentReviewPage = () => {
  return (
    <div className="home-container">
      <Header activeTab="home" />
      <PaymentReview />
    </div>
  );
};

export default PaymentReviewPage;
