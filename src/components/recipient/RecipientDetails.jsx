import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBell,
  faRemove,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Transaction from "../home/Transaction";
const RecipientDetails = ({ selectedRecipient, handleCloseModal }) => {
  return (
    <main className="content p-5">
      <div className="recipient-container">
        <div className="header">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => handleCloseModal()}
            className="back-icon"
          />
          <h2>Recipient</h2>
          <FontAwesomeIcon icon={faBell} />
        </div>

        <div className="profile-section">
          <img
            src={selectedRecipient.image}
            alt="Recipient"
            className="profile-image"
          />
          <h3>{selectedRecipient.name}</h3>
          <p className="account-number">{selectedRecipient.number}</p>
        </div>

        <div className="action-buttons">
          <div className="mx-2 d-flex flex-column align-items-center">
            <button className="action send btn-outline">
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
            <button className="action remove">
              <FontAwesomeIcon icon={faRemove} />
            </button>
            <span className="my-1 icon-sub-text">Remove</span>
          </div>
        </div>
        <div className="account-details">
          <h4>Account Details</h4>
          <div className="details my-3">
            <p className="brand-color-text">
              <span>Account Provider</span>
              Commercial Bank of Ethiopia
            </p>
            <p>
              <span>Account Number</span>
              00087392265
            </p>
          </div>
        </div>

        <Transaction />
      </div>
    </main>
  );
};

RecipientDetails.propTypes = {
  selectedRecipient: PropTypes.object.isrequeired,
  handleCloseModal: PropTypes.func.isrequeired,
};
export default RecipientDetails;
