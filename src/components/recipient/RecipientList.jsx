import PropTypes from "prop-types";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faSearch } from "@fortawesome/free-solid-svg-icons";

const RecipientList = ({ handleRecipientClick, recipients }) => {
  return (
    <main className="content p-5">
      <section className="amount-section d-flex justify-content-between w-100">
        <div className="amount-input-container" style={{ maxWidth: "400px" }}>
          <input
            type="text"
            placeholder="Amount"
            className="amount-input"
            style={{ maxWidth: "400px" }}
          />
          <div className="currency">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div style={{ width: "200px" }}>
          <PrimaryButton
            text="Add Recipient"
            onClick={() => {}}
            isLoading={false}
          />
        </div>
      </section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <select className="form-select w-auto select-recipient-options">
          <option value="all">All Recipient</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
      <ul className="list-group ">
        {recipients.map((recipient, index) => (
          <button
            key={index + 1}
            className="list-group-item d-flex justify-content-between align-items-center my-2"
            onClick={() => handleRecipientClick(recipient)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center">
              <img
                src={recipient.image}
                alt="Recipient Avatar"
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <h6 className="mb-0">{recipient.name}</h6>
                <small className="text-muted">{recipient.number}</small>
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronRight} color="#895cfe" />
          </button>
        ))}
      </ul>
    </main>
  );
};
RecipientList.propTypes = {
  recipients: PropTypes.object.isrequeired,
  handleRecipientClick: PropTypes.func.isRequired,
};
export default RecipientList;
