import Transaction from "../../components/home/Transaction";
import Header from "../../components/shared/header/Header";
import "./HomePage.scss";

const TransactionPage = () => {
  return (
    <div className="home-container">
      <Header activeTab="home" />
      <main className="content">
        <Transaction homepage={false} />
      </main>
    </div>
  );
};

export default TransactionPage;
