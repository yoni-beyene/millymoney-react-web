import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import HTTPService from "../../services/shared/HTTPService";
import { useSelector } from "react-redux";
import formatDateTime from "../../services/shared/formatDateTime";
import LoadingComponent from "../shared/loadingPage/LoadingComponent";
import LoadingPage from "../shared/loadingPage/LoadingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import TransactionDetailsModal from "./TransactionDetailsModal ";

const Transaction = ({ homepage }) => {
  const [show, setShow] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [transfers, setTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const senderId = useSelector((state) => state.global.senderId);

  useEffect(() => {
    HTTPService.post("/remit/sender-remits/" + senderId)
      .then((res) => {
        setIsLoading(false);
        if (homepage) {
          setTransfers(res.data.remits.slice(0, 4));
        } else {
          setTransfers(res.data.remits);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data.err);
      });
  }, [senderId]);
  if (homepage) {
    return (
      <section className="transactions-section ">
        <TransactionDetailsModal
          show={show}
          handleClose={() => setShow(false)}
          transaction={transaction}
        />

        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="recipient-container card p-5">
            <div className="d-flex justify-content-between mt-3 mb-1 ">
              <h5 className="home-page-transaction-title">Transaction</h5>
              <a
                href="/transaction"
                className="view-all home-page-transaction-title"
              >
                View All
              </a>
            </div>
            <div className="transactions mb-3">
              {transfers.map((transfer, index) => (
                <div
                  className="transaction-item my-3"
                  key={index + 1}
                  onClick={() => {
                    setTransaction(transfer);
                    setShow(true);
                  }}
                >
                  <div className="d-flex align-items-center">
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

                    <div className="transaction-texts">
                      Transfer to {transfer.accountHolderFirstName}{" "}
                      {transfer.accountHolderLastName}
                      <br />
                      <span className="transaction-texts-date-time">
                        {" "}
                        {formatDateTime(transfer.createdAt)}
                      </span>
                    </div>
                  </div>

                  <p className="amount text-left ">${transfer.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  } else {
    return (
      <div>
        <TransactionDetailsModal
          show={show}
          handleClose={() => setShow(false)}
          transaction={transaction}
        />
        <header className="header">
          <h1 className="mb-3">Transaction</h1>
        </header>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <section className="transactions-section ">
            <div className="recipient-container">
              <div className="transactions mb-3">
                {transfers.map((transfer, index) => (
                  <div
                    className="transaction-item my-3 w-100"
                    key={index + 1}
                    onClick={() => {
                      setTransaction(transfer);
                      setShow(true);
                    }}
                  >
                    <div className="d-flex align-items-center">
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

                      <div className="transaction-texts">
                        Transfer to {transfer.accountHolderFirstName}{" "}
                        {transfer.accountHolderLastName}
                        <br />
                        <span className="transaction-texts-date-time">
                          {" "}
                          {formatDateTime(transfer.createdAt)}
                        </span>
                      </div>
                    </div>

                    <p className="amount text-left ">${transfer.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
};

export default Transaction;
