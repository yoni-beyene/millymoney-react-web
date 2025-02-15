import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faBell,
  faShieldAlt,
  faPowerOff,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Profile.scss";
import user from "../../assets/images/user-icon.jpeg";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((state) => state.global.sender);
  console.log(userData);

  return (
    <main className="content p-5">
      <h1>Profile</h1>
      <div className="profile-page">
        <div className="profile-header">
          <img className="profile-avatar" src={user} alt="Profile Avatar" />
          <h2 className="profile-name">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="profile-email">
            {userData.phoneNumber}
            <br /> {userData.email}
          </p>
        </div>

        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed profile-option"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <FontAwesomeIcon icon={faUser} className="me-3" />
                <span>Personal Details</span>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
            >
              <div className="accordion-body">
                This is the first item's accordion body.
              </div>
            </div>
          </div>
        </div>
        <div className="profile-options">
          <div className="profile-option">
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Terms of use</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          <div className="profile-option">
            <FontAwesomeIcon icon={faBell} />
            <span>Privacy policy</span>
            <FontAwesomeIcon icon={faChevronRight} />
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
