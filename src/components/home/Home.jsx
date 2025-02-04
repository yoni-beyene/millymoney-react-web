import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import Transaction from "./Transaction";
import PropTypes from "prop-types";
import {
  faArrowDown,
  faArrowUp,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Home = ({ setHomeContent }) => {
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
      <section className="actions-section">
        <h5>Suggestion Actions</h5>
        <div className="actions">
          <div className="action-item ">
            <FontAwesomeIcon icon={faPlus} />
            Add
          </div>
          <div
            className="action-item"
            onClick={() => setHomeContent("transferMoney")}
          >
            <span style={{ rotate: "-90deg" }}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>{" "}
            Send
          </div>
          <div className="action-item">
            <span style={{ rotate: "90deg" }}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>{" "}
            Receive
          </div>
          <div className="action-item">
            <span>
              <FontAwesomeIcon icon={faArrowUp} />
              <FontAwesomeIcon icon={faArrowDown} />
            </span>{" "}
            History
          </div>
        </div>
      </section>{" "}
      <Transaction />
    </main>
  );
};
Home.propTypes = {
  setHomeContent: PropTypes.func.isRequired,
};
export default Home;
