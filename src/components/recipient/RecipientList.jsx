import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/images/user-icon.jpeg";

const RecipientList = ({ handleRecipientClick, recipients }) => {
  return (
    <>
      {recipients.length === 0 ? (
        <div>
          <h1 className="text-danger text-center">No recipients found</h1>
        </div>
      ) : (
        <ul className="list-group ">
          {recipients.map((recipient, index) => (
            <button
              key={index + 1}
              className="list-group-item d-flex justify-content-between align-items-center my-2 py-4 recipient-page-btn"
              onClick={() => handleRecipientClick(recipient)}
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
                  <small className="text-muted">
                    {recipient.accountNumber}
                  </small>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                color="#924ffa"
                style={{ fontSize: "1.7em" }}
              />
            </button>
          ))}
        </ul>
      )}
    </>
  );
};
RecipientList.propTypes = {
  recipients: PropTypes.object.isrequeired,
  handleRecipientClick: PropTypes.func.isRequired,
};
export default RecipientList;
