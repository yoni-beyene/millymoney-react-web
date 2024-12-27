import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Transaction = () => {
  const transactionList = [
    {
      name: "Transfer to Leonard H.",
      time: "05:15 PM",
      amount: "$160",
      type: "Send",
    },
    {
      name: "Payment from Sarah J.",
      time: "10:30 AM",
      amount: "$240",
      type: "Receive",
    },
    {
      name: "Subscription to Netflix",
      time: "02:00 PM",
      amount: "$15",
      type: "Send",
    },
  ];

  return (
    <section className="transactions-section">
      <div className="d-flex justify-content-between my-3">
        <h5>Transaction</h5>
        <a href="/" className="view-all">
          View All
        </a>
      </div>
      <div className="transactions">
        {transactionList.map((transactionList, index) => (
          <div className="transaction-item" key={index + 1}>
            <div className="d-flex align-item-center">
              <div className="transaction-item-icon">
                <span
                  className="me-3 "
                  style={
                    transactionList.type == "Send"
                      ? { rotate: "45deg", marginLeft: "15px" }
                      : { rotate: "-135deg", marginLeft: "10px" }
                  }
                >
                  {" "}
                  {<FontAwesomeIcon icon={faArrowUp} />}
                </span>
              </div>

              <div>
                <p>{transactionList.name}</p>
                <span>{transactionList.time}</span>
              </div>
            </div>

            <p className="amount">{transactionList.amount}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Transaction;
