import { useState } from "react";
import Cards from "../../components/card/Cards";
import Header from "../../components/shared/header/Header";
import AddCard from "../../components/card/AddCard";

const CardsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const addNewCard = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="home-container">
      <Header activeTab="cards" />
      {showModal ? (
        <AddCard handleCloseModal={handleCloseModal} />
      ) : (
        <Cards addNewCard={addNewCard} />
      )}
    </div>
  );
};

export default CardsPage;
