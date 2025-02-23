import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/images/user-icon.jpeg";

const RecipientList = ({ handleRecipientClick, recipients }) => {
  return (
    <ul className="list-group ">
      {recipients.map((recipient, index) => (
        <button
          key={index + 1}
          className="list-group-item d-flex justify-content-between align-items-center my-2 py-3"
          onClick={() => handleRecipientClick(recipient)}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center">
            <img
              src={user}
              alt="Recipient Avatar"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <div>
              <h6 className="mb-0">{recipient.firstName}</h6>
              <small className="text-muted">{recipient.accountNumber}</small>
            </div>
          </div>
          <FontAwesomeIcon icon={faChevronRight} color="#895cfe" />
        </button>
      ))}
    </ul>
  );
};
RecipientList.propTypes = {
  recipients: PropTypes.object.isrequeired,
  handleRecipientClick: PropTypes.func.isRequired,
};
export default RecipientList;
