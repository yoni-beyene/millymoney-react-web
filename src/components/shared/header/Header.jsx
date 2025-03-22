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
import { useDispatch } from "react-redux";
import { globalActionType } from "../../../store/action/shared/globalAction";
const Header = (props) => {
  const dispatch = useDispatch();

  return (
    <aside className="sidebar pt-5">
      <ul className="menu">
        <a href="/home" style={{ color: "white", textDecoration: "unset" }}>
          <li className={`menu-item ${props.activeTab === "home" && "active"}`}>
            <span className="me-2">
              <FontAwesomeIcon icon={faHome} />
            </span>{" "}
            Home
          </li>
        </a>
        <a
          href="/statistics"
          style={{ color: "white", textDecoration: "unset" }}
        >
          <li
            className={`menu-item ${
              props.activeTab === "statistics" && "active"
            }`}
          >
            <span className="me-2">
              <FontAwesomeIcon icon={faChartSimple} />
            </span>{" "}
            Statistics
          </li>
        </a>
        <a
          href="/recipient"
          style={{ color: "white", textDecoration: "unset" }}
        >
          <li
            className={`menu-item ${
              props.activeTab === "recipient" && "active"
            }`}
          >
            <span className="me-2">
              <FontAwesomeIcon icon={faPeopleGroup} />
            </span>{" "}
            Recipient
          </li>
        </a>
        <a href="/cards" style={{ color: "white", textDecoration: "unset" }}>
          <li
            className={`menu-item ${props.activeTab === "cards" && "active"}`}
          >
            <span className="me-2">
              <FontAwesomeIcon icon={faCreditCard} />
            </span>{" "}
            Cards
          </li>
        </a>
        <a href="/profile" style={{ color: "white", textDecoration: "unset" }}>
          <li
            className={`menu-item ${props.activeTab === "profile" && "active"}`}
          >
            <span className="me-2">
              <FontAwesomeIcon icon={faUser} />
            </span>{" "}
            Profile
          </li>
        </a>
      </ul>
      <div
        className="logout"
        onClick={() =>
          dispatch({
            type: globalActionType.LOGOUT,
          })
        }
      >
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
