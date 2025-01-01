import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faBell,
  faShieldAlt,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import "./Profile.scss";
const Profile = () => {
  return (
    <main className="content p-5">
      <h1>Profile</h1>
      <div className="profile-page">
        <div className="profile-header">
          <img
            className="profile-avatar"
            src="https://via.placeholder.com/100"
            alt="Profile Avatar"
          />
          <h2 className="profile-name">Sheldon Cooper</h2>
          <p className="profile-email">sheldoncop@gmail.com</p>
        </div>
        <div className="profile-options">
          <div className="profile-option">
            <FontAwesomeIcon icon={faUser} />
            <span>Personal Details</span>
            <FontAwesomeIcon icon="chevron-right" />
          </div>
          <div className="profile-option">
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Linked Cards and Accounts</span>
            <FontAwesomeIcon icon="chevron-right" />
          </div>
          <div className="profile-option">
            <FontAwesomeIcon icon={faBell} />
            <span>Notifications</span>
            <FontAwesomeIcon icon="chevron-right" />
          </div>
          <div className="profile-option">
            <FontAwesomeIcon icon={faShieldAlt} />
            <span>Security</span>
            <FontAwesomeIcon icon="chevron-right" />
          </div>
          <div className="profile-option logout">
            <FontAwesomeIcon icon={faPowerOff} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
