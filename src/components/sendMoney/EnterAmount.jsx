import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sendMoney.scss";

const EnterAmount = () => {
  const [amount, setAmount] = useState(100);
  const [converted, setConverted] = useState(0);
  const [bankRate, setBankRate] = useState(124);
  const [calculatedBonus, setCalculatedBonus] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setConverted(amount * bankRate);
    setCalculatedBonus((amount * bankRate * 0.05).toFixed(2));
  }, [amount, bankRate]);

  const handleSubmit = () => {
    navigate("/send-money/enter-recipient", {
      state: { amount, bankRate, converted },
    });
  };

  return (
    <div className="enter-amount-container">
      <h1 className="title">Enter Amount</h1>
      <input
        className="amount-input"
        type="number"
        value={amount}
        onChange={(e) =>
          setAmount(Math.min(Math.max(e.target.value, 10), 5000))
        }
      />
      <p className="converted">Converted: {converted} ETB</p>
      <p className="bonus">Bonus: {calculatedBonus} ETB</p>
      <button className="next-button" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default EnterAmount;
