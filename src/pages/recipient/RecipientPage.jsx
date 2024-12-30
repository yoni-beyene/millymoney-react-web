import RecipientList from "../../components/recipient/RecipientList";
import Header from "../../components/shared/header/Header";

const RecipientPage = () => {
  const recipients = [
    {
      name: "Tadiyos Belete",
      number: "00087392265",
      image: "https://via.placeholder.com/40",
    },
    {
      name: "Tadiyos Belete",
      number: "00087392265",
      image: "https://via.placeholder.com/40",
    },
    {
      name: "Tadiyos Belete",
      number: "00087392265",
      image: "https://via.placeholder.com/40",
    },
    {
      name: "Tadiyos Belete",
      number: "00087392265",
      image: "https://via.placeholder.com/40",
    },
    {
      name: "Tadiyos Belete",
      number: "00087392265",
      image: "https://via.placeholder.com/40",
    },
  ];

  return (
    <div className="home-container">
      <Header activeTab="recipient" />
      <RecipientList recipients={recipients} />
    </div>
  );
};

export default RecipientPage;
