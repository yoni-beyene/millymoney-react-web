import Profile from "../../components/profile/Profile";
import Header from "../../components/shared/header/Header";

const ProfilePage = () => {
  return (
    <div className="home-container">
      <Header activeTab="profile" />
      <Profile />
      <h1>Profile</h1>
    </div>
  );
};

export default ProfilePage;
