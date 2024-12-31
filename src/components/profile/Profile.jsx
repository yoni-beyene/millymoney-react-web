import "./Profile.scss";

const Profile = () => {
  return (
    <div className="profile-container w-100">
      <div className="profile-header">
        <div className="profile-picture">
          <img
            src="https://via.placeholder.com/80" // Replace with actual image URL
            alt="Profile"
          />
        </div>
        <h2 className="profile-name">Sheldon Cooper</h2>
        <p className="profile-email">sheldoncop@gmail.com</p>
      </div>
      <div className="profile-options">
        <div className="option">
          <i className="icon personal-details"></i>
          <span>Personal Details</span>
          <i className="icon arrow"></i>
        </div>
        <div className="option">
          <i className="icon linked-cards"></i>
          <span>Linked Cards and Accounts</span>
          <i className="icon arrow"></i>
        </div>
        <div className="option">
          <i className="icon notifications"></i>
          <span>Notifications</span>
          <i className="icon arrow"></i>
        </div>
        <div className="option">
          <i className="icon security"></i>
          <span>Security</span>
          <i className="icon arrow"></i>
        </div>
        <div className="option logout">
          <i className="icon logout-icon"></i>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
