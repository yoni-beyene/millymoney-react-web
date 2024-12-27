import {
  faArrowDown,
  faArrowUp,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SuggestionActions = () => {
  return (
    <section className="actions-section">
      <h5>Suggestion Actions</h5>
      <div className="actions">
        <div className="action-item ">
          <FontAwesomeIcon icon={faPlus} />
          Add
        </div>
        <div className="action-item">
          <span style={{ rotate: "-90deg" }}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>{" "}
          Send
        </div>
        <div className="action-item">
          <span style={{ rotate: "90deg" }}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>{" "}
          Receive
        </div>
        <div className="action-item">
          <span>
            <FontAwesomeIcon icon={faArrowUp} />
            <FontAwesomeIcon icon={faArrowDown} />
          </span>{" "}
          History
        </div>
      </div>
    </section>
  );
};

export default SuggestionActions;
