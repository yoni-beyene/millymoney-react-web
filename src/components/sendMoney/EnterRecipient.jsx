import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./sendMoney.scss";

const EnterRecipient = () => {
  const [recipient, setRecipient] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, bankRate, converted } = location.state;

  const handleSubmit = () => {
    navigate("/reviewPayment", {
      state: { amount, bankRate, converted, recipient },
    });
  };

  return (
    <div className="enter-recipient-container">
      <h1 className="title">Enter Recipient</h1>
      <input
        className="recipient-input"
        type="text"
        placeholder="Recipient Name"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <button className="next-button" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default EnterRecipient;
