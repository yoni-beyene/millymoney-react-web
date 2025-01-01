import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";
const AddCard = ({ handleCloseModal }) => {
  return (
    <main className="content p-5">
      <div className="recipient-container">
        <div className="header">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => handleCloseModal()}
            className="back-icon"
          />
          <h2>Add New Card</h2>
          <FontAwesomeIcon icon={faBell} />
        </div>

        <form className="add-card-form">
          <div className="form-row">
            <div className="row my-2">
              <div className="col-6">
                <div className="form-group">
                  <label className="add-card-label" htmlFor="card-number">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="Card Number "
                    className="textInputMedium"
                    id="card-number"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="add-card-label" htmlFor="card-holder-name">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    className="textInputMedium"
                    id="card-holder-name"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="row my-2">
              <div className="col-6">
                <div className="form-group">
                  <label className="add-card-label" htmlFor="expiry-date">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="Expiry Date"
                    className="textInputMedium"
                    id="expiry-date"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="add-card-label" htmlFor="cvc-input">
                    CVV/CVC
                  </label>
                  <input
                    type="text"
                    placeholder="CVV/CVC"
                    className="textInputMedium"
                    id="cvc-input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="row my-2">
              <div className="col-6">
                <div className="form-group">
                  <label className="add-card-label" htmlFor="address-line-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    className="textInputMedium"
                    id="address-line-1"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="add-card-label" htmlFor="address-line-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    className="textInputMedium"
                    id="address-line-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center mt-5">
            <div style={{ maxWidth: "400px" }}>
              <PrimaryButton
                text="Save Card"
                onClick={() => {}}
                isLoading={false}
              />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

AddCard.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};
export default AddCard;
