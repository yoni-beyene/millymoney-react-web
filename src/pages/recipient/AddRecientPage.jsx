import AddRecipient from "../../components/recipient/AddRecipient";
import Header from "../../components/shared/header/Header";

const AddRecientPage = () => {
  return (
    <div className="home-container">
      <Header activeTab="recipient" />
      <AddRecipient />
    </div>
  );
};

export default AddRecientPage;
