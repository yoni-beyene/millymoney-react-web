import { Modal, Button } from "react-bootstrap";
import formatDateTime from "../../services/shared/formatDateTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
const TransactionDetailsModal = ({ show, handleClose, transaction }) => {
  if (!transaction) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Transaction Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Top Section */}
        <div className="text-center">
          <div
            className="d-flex justify-content-center align-items-center rounded-circle bg-dark"
            style={{ width: 50, height: 50, margin: "0 auto" }}
          >
            <FontAwesomeIcon
              size={35}
              icon={faArrowUpFromBracket}
              color="white"
            />
          </div>
          <h1 className="mt-3 text-primary">${transaction.amount}</h1>
          <h5 className="text-muted">
            {transaction.accountHolderFirstName}{" "}
            {transaction.accountHolderLastName}
          </h5>
        </div>

        {/* Bottom Section */}
        <div className="mt-4">
          <h4 className="text-dark">Transaction Details</h4>
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <span>Sender Name</span>
              <span>
                {transaction.accountHolderFirstName}{" "}
                {transaction.accountHolderLastName}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Amount</span>
              <span>${transaction.amount}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Date</span>
              <span>{formatDateTime(transaction.createdAt)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Reference</span>
              <span>{transaction.reference}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Transaction Number</span>
              <span>{transaction.gatewayRef}</span>
            </div>
          </div>
        </div>
        {/* 
        <div className="text-center mt-4">
          <Button
            variant="primary"
            onClick={() => {
              console.log("Repeat Transaction Clicked");
              handleClose();
            }}
          >
            Repeat this transaction
          </Button>
        </div> */}
      </Modal.Body>
    </Modal>
  );
};

export default TransactionDetailsModal;
