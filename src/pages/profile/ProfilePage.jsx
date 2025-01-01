import Profile from "../../components/profile/Profile";
import Header from "../../components/shared/header/Header";

const ProfilePage = () => {
  return (
    <div className="home-container">
      <Header activeTab="profile" />
      <Profile />
    </div>
  );
};

export default ProfilePage;
