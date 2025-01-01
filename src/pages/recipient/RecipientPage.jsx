import { useState } from "react";
import RecipientList from "../../components/recipient/RecipientList";
import Header from "../../components/shared/header/Header";
import RecipientDetails from "../../components/recipient/RecipientDetails";
import "./RecipientPage.scss";
const RecipientPage = () => {
  const recipients = [
    {
      name: "Tadiyos Belete",
      number: "00087392265",
      image:
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Tadiyos Belete",
      number: "00087392265",
      image:
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Tadiyos Belete",
      number: "00087392265",
      image:
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Tadiyos Belete",
      number: "00087392265",
      image:
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Tadiyos Belete",
      number: "00087392265",
      image:
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRecipientClick = (recipient) => {
    setSelectedRecipient(recipient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipient(null);
  };
  return (
    <div className="home-container">
      <Header activeTab="recipient" />

      {showModal ? (
        <RecipientDetails
          handleCloseModal={handleCloseModal}
          selectedRecipient={selectedRecipient}
        />
      ) : (
        <RecipientList
          recipients={recipients}
          handleRecipientClick={handleRecipientClick}
        />
      )}
    </div>
  );
};

export default RecipientPage;
