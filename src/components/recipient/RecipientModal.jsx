import PropTypes from "prop-types";

const RecipientModal = ({ recipient, show, onClose }) => {
  if (!recipient) return null;

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">
            <img
              src={recipient.image}
              alt="Recipient"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px" }}
            />
            <h4 className="fw-bold">{recipient.name}</h4>
            <p className="text-muted">{recipient.number}</p>
            <div className="d-flex justify-content-center my-3">
              <button className="btn btn-primary mx-2">
                <i className="bi bi-send"></i> Send
              </button>
              <button className="btn btn-primary mx-2">
                <i className="bi bi-download"></i> Receive
              </button>
              <button className="btn btn-outline-danger mx-2">
                <i className="bi bi-trash"></i> Remove
              </button>
            </div>
            <hr />
            <div className="text-start">
              <h5>Account Details</h5>
              <p>
                <strong>Account Provider:</strong> Commercial Bank of Ethiopia
              </p>
              <p>
                <strong>Account Number:</strong> 00087392265
              </p>
            </div>
            <hr />
            <div className="text-start">
              <h5>Recent Transactions</h5>
              <div className="d-flex justify-content-between">
                <span>
                  <i className="bi bi-arrow-up-right text-danger"></i> Transfer
                  to Leonard H.
                </span>
                <span>$160</span>
              </div>
              <small className="text-muted">05:15 PM</small>
              <div className="d-flex justify-content-between mt-3">
                <span>
                  <i className="bi bi-arrow-down-left text-success"></i> Receive
                  from Penny
                </span>
                <span>$45</span>
              </div>
              <small className="text-muted">04:43 PM</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipientModal.propTypes = {
  recipient: PropTypes.object.isrequeired,
  show: PropTypes.bool.isrequeired,
  onClose: PropTypes.func.isrequeired,
};
export default RecipientModal;
