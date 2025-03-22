import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faRemove,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/images/user-icon.jpeg";
import { useEffect, useState } from "react";
import HTTPService from "../../services/shared/HTTPService";
import { useSelector } from "react-redux";
import formatDateTime from "../../services/shared/formatDateTime";
import LoadingComponent from "../shared/loadingPage/LoadingComponent";
import LoadingPage from "../shared/loadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import TransactionDetailsModal from "../home/TransactionDetailsModal ";

const RecipientDetails = ({ selectedRecipient }) => {
  const navigate = useNavigate();
  const senderId = useSelector((state) => state.global.senderId);
  const [loading, setIsLoading] = useState(false);
  const [bank, setBank] = useState([]);

  const [transfers, setTransfers] = useState([]);

  const [loadingRecipients, setLoadingRecipients] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [show, setShow] = useState(false);
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    readAllBank();
    readAllRecipient();
  }, []);

  const readAllRecipient = () => {
    HTTPService.post(
      `/remit/remits-to-recipient/${senderId}/${selectedRecipient.recipientId}`
    )
      .then((res) => {
        setTransfers(res.data.remits);
        setLoadingRecipients(false);
      })
      .catch((err) => {
        setLoadingRecipients(false);
        alert(err);
      });
  };
  const readAllBank = () => {
    HTTPService.get("/bank/bank-by-id/" + selectedRecipient.bankId)
      .then((res) => {
        setBank(res.data.bank);
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  const removeRecipient = () => {
    setIsLoading(true);
    const url = `/sender/recipient/remove-recipient/${senderId}/${selectedRecipient.recipientId}`;
    HTTPService.post(url)
      .then((res) => {
        setIsLoading(false);
        navigate("/recipient");
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err);
      });
  };

  return (
    <main className="p-5">
      <TransactionDetailsModal
        show={show}
        handleClose={() => setShow(false)}
        transaction={transaction}
      />
      {loading && <LoadingPage />}

      <div className="recipient-container p-5">
        <div className="profile-section">
          <img src={user} alt="Recipient" className="profile-image" />
          <h3>{selectedRecipient.firstName}</h3>
          <p className="account-number">{selectedRecipient.accountNumber}</p>
        </div>

        <div className="action-buttons">
          <div className="mx-2 d-flex flex-column align-items-center">
            <button
              className="action send btn-outline"
              onClick={() =>
                navigate(
                  `/transfer-money?recipient-id=${selectedRecipient.recipientId}`
                )
              }
            >
              <span style={{ rotate: "-90deg" }}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
            </button>
            <span className="my-1 icon-sub-text">Send</span>
          </div>
          <div className="mx-2 d-flex flex-column align-items-center">
            <button className="action receive">
              <span style={{ rotate: "90deg" }}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
            </button>
            <span className="my-1 icon-sub-text">Recieve</span>
          </div>
          <div className="mx-2 d-flex flex-column align-items-center">
            <button
              className="action remove"
              onClick={() => setShowConfirmModal(true)}
            >
              <FontAwesomeIcon icon={faRemove} />
            </button>
            <span className="my-1 icon-sub-text">Remove</span>
          </div>
        </div>
        {bank && (
          <div className="account-details">
            <h4>Account Details</h4>
            <div className="details my-3">
              <p className="brand-color-text">
                <span>Account Provider</span>
                {bank.bankName}
              </p>
              <p>
                <span>Account Number</span>
                {selectedRecipient.accountNumber}{" "}
              </p>
            </div>
          </div>
        )}

        <section className="transactions-section">
          {loadingRecipients ? (
            <LoadingComponent />
          ) : (
            <div className="card px-5">
              <div className="d-flex justify-content-between my-3">
                <h5>Transaction</h5>
                <a href="/transaction" className="view-all">
                  View All
                </a>
              </div>
              <div className="transactions">
                {transfers.map((transfer, index) => (
                  <div
                    className="transaction-item"
                    key={index + 1}
                    onClick={() => {
                      setShow(true);
                      setTransaction(transfer);
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

                      <div>
                        Transfer to {transfer.accountHolderFirstName}{" "}
                        {transfer.accountHolderLastName}
                        <span> {formatDateTime(transfer.createdAt)}</span>
                      </div>
                    </div>

                    <p className="amount"> ${transfer.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {showConfirmModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Removal</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove this recipient?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={removeRecipient}>
                  {" "}
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

RecipientDetails.propTypes = {
  selectedRecipient: PropTypes.object.isrequeired,
};
export default RecipientDetails;
