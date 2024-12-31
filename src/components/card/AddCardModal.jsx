import PropTypes from "prop-types";

const AddCardModal = ({ show, onClose }) => {
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
            <h2>Add New Card</h2>
            <form className="add-card-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="Card Number" />
                </div>
                <div className="form-group">
                  <label>Card Holder Name</label>
                  <input type="text" placeholder="Card Holder Name" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="Expiry Date" />
                </div>
                <div className="form-group">
                  <label>CVV/CVC</label>
                  <input type="text" placeholder="CVV/CVC" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Address Line 1</label>
                  <input type="text" placeholder="Address Line 1" />
                </div>
                <div className="form-group">
                  <label>Address Line 2</label>
                  <input type="text" placeholder="Address Line 2" />
                </div>
              </div>
              <button type="submit" className="save-card-btn">
                Save Card
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddCardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default AddCardModal;
