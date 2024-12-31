import {
  faCreditCard,
  faHome,
  faPeopleGroup,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "./Header.scss";
const Header = (props) => {
  return (
    <aside className="sidebar pt-5">
      <ul className="menu">
        <li className={`menu-item ${props.activeTab === "home" && "active"}`}>
          <a href="/home" style={{ color: "white", textDecoration: "unset" }}>
            <span className="me-2">
              <FontAwesomeIcon icon={faHome} />
            </span>{" "}
            Home
          </a>
        </li>
        <li
          className={`menu-item ${
            props.activeTab === "statistics" && "active"
          }`}
        >
          <a
            href="/statistics"
            style={{ color: "white", textDecoration: "unset" }}
          >
            <span className="me-2">
              <FontAwesomeIcon icon={faChartSimple} />
            </span>{" "}
            Statistics
          </a>
        </li>
        <li
          className={`menu-item ${props.activeTab === "recipient" && "active"}`}
        >
          <a
            href="/recipient"
            style={{ color: "white", textDecoration: "unset" }}
          >
            <span className="me-2">
              <FontAwesomeIcon icon={faPeopleGroup} />
            </span>{" "}
            Recipient
          </a>
        </li>
        <li className={`menu-item ${props.activeTab === "cards" && "active"}`}>
          <a href="/cards" style={{ color: "white", textDecoration: "unset" }}>
            <span className="me-2">
              <FontAwesomeIcon icon={faCreditCard} />
            </span>{" "}
            Cards
          </a>
        </li>
        <li
          className={`menu-item ${props.activeTab === "profile" && "active"}`}
        >
          <a
            href="/profile"
            style={{ color: "white", textDecoration: "unset" }}
          >
            <span className="me-2">
              <FontAwesomeIcon icon={faUser} />
            </span>{" "}
            Profile
          </a>
        </li>
      </ul>
      <div className="logout">
        <span className="me-2">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </span>{" "}
        Logout
      </div>
    </aside>
  );
};
Header.propTypes = {
  activeTab: PropTypes.string.isRequired,
};
export default Header;
