import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import Transaction from "./Transaction";
import {
  faArrowDown,
  faArrowUp,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMoneyAction } from "../../store/action/sendMoneyAction";
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";

const Home = () => {
  const navigate = useNavigate();
  const amountInputRef = useRef("");
  const userData = useSelector((state) => state.global.sender);

  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const sendMoneyHandler = () => {
    dispatch({
      type: sendMoneyAction.UPDATE_AMOUNT,
      amount: amount,
    });
    navigate("/transfer-money");
  };
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning!";
    } else if (currentHour < 18) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  };
  return (
    <main className="content">
      <div className="">
        <header className="header">
          <div>
            <h4 className="my-3">{getGreeting()} 👋</h4>
            <h1> {userData.firstName + " " + userData.lastName}</h1>
          </div>
          <i className="bi bi-bell"></i>
        </header>
        <div className="row amount-section">
          <div className="col-6 my-2">
            <label htmlFor="amount-home" className="amount-label mb-2">
              Amount
            </label>
            <div className="amount-input-container">
              <input
                placeholder="Amount"
                className="amount-input mt-3"
                type="number"
                onChange={(value) => setAmount(value.target.value)}
                ref={amountInputRef}
                id="amount-home"
              />
              <div className="currency">
                <Flag code="US" height="35" width={35} />
                USD
              </div>
            </div>
          </div>
          <div className="col-6 my-2">
            <div style={{ borderRadius: "60px", height: "80px" }}>
              <PrimaryButton
                text="Send Money"
                onClick={() => sendMoneyHandler()}
                isLoading={false}
                borderRadius={40}
              />
            </div>
          </div>
        </div>
        <section className="actions-section">
          <h5>Suggestion Actions</h5>
          <div className="actions">
            <div className="action-item ">
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => navigate("/recipient")}
              />
              Add
            </div>
            <div className="action-item" onClick={() => sendMoneyHandler()}>
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
      </div>
    </main>
  );
};

export default Home;
