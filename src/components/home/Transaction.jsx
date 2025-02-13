import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import HTTPService from "../../services/shared/HTTPService";
import { useSelector } from "react-redux";
import formatDateTime from "../../services/shared/formatDateTime";
import LoadingComponent from "../shared/loadingPage/LoadingComponent";

const Transaction = () => {
  const [transfers, setTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const senderId = useSelector((state) => state.global.senderId);

  useEffect(() => {
    HTTPService.post("/remit/sender-remits/" + senderId)
      .then((res) => {
        setIsLoading(false);
        setTransfers(res.data.remits);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data.err);
      });
  }, [senderId]);

  return (
    <section className="transactions-section">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="d-flex justify-content-between my-3">
            <h5>Transaction</h5>
            <a href="/" className="view-all">
              View All
            </a>
          </div>
          <div className="transactions">
            {transfers.map((transfer, index) => (
              <div className="transaction-item" key={index + 1}>
                <div className="d-flex align-item-center">
                  <div className="transaction-item-icon">
                    <span
                      className="me-3 "
                      style={
                        transfer != null
                          ? { rotate: "45deg", marginLeft: "15px" }
                          : { rotate: "-135deg", marginLeft: "10px" }
                      }
                    >
                      {" "}
                      {<FontAwesomeIcon icon={faArrowUp} />}
                    </span>
                  </div>

                  <div>
                    Transfer to {transfer.accountHolderFirstName}{" "}
                    {transfer.accountHolderLastName}
                    <span> {formatDateTime(transfer.createdAt)}</span>
                  </div>
                </div>

                <p className="amount">{transfer.amount}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
export default Transaction;
