import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import SuggestionActions from "./SuggestionActions";
import Transaction from "./Transaction";

const Home = () => {
  return (
    <main className="content p-5">
      <header className="header">
        <div>
          <h5>Good morning 👋</h5>
          <h2>Sheldon Cooper</h2>
        </div>
        <i className="bi bi-bell"></i>
      </header>
      <section className="amount-section">
        <div className="amount-input-container">
          <input type="text" placeholder="Amount" className="amount-input" />
          <div className="currency">
            <img src="https://flagcdn.com/us.svg" alt="USD" /> USD
          </div>
        </div>
        <div style={{ width: "700px" }}>
          <span style={{ borderRadius: "60px" }}>
            <PrimaryButton
              text="Send Money"
              onClick={() => {}}
              isLoading={false}
              borderRadius={40}
            />
          </span>
        </div>
      </section>
      <SuggestionActions />
      <Transaction />
    </main>
  );
};
export default Home;
