import PropTypes from "prop-types";
import RecipientModal from "./RecipientModal";
import { useState } from "react";

const RecipientList = (props) => {
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRecipientClick = (recipient) => {
    setSelectedRecipient(recipient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipient(null);
  };

  return (
    <div className="container mt-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Recipient</h1>
        <button className="btn btn-primary px-4 py-2">
          <i className="bi bi-plus"></i> Add Recipient
        </button>
      </header>
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
          <button className="btn btn-outline-secondary" type="button">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span>All Recipient</span>
        <select className="form-select w-auto">
          <option value="all">All Recipient</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
      <ul className="list-group">
        {props.recipients.map((recipient, index) => (
          <button
            key={index + 1}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => handleRecipientClick(recipient)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center">
              <img
                src={recipient.image}
                alt="Recipient Avatar"
                className="rounded-circle me-3"
                style={{ width: "40px", height: "40px" }}
              />
              <div>
                <h6 className="mb-0">{recipient.name}</h6>
                <small className="text-muted">{recipient.number}</small>
              </div>
            </div>
            <i className="bi bi-chevron-right"></i>
          </button>
        ))}
      </ul>
      <RecipientModal
        recipient={selectedRecipient}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};
RecipientList.propTypes = {
  recipients: PropTypes.object.isrequeired,
};
export default RecipientList;
