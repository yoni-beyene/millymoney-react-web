import { useState } from "react";
import "./Cards.scss";
import AddCardModal from "./AddCardModal";
const Cards = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="cards-page">
      <header className="cards-header">
        <h2>Cards</h2>
        <button className="add-card-btn" onClick={handleModalToggle}>
          + Add Card
        </button>
      </header>

      <div className="cards-container">
        {[1, 2, 3].map((_, index) => (
          <div className="card" key={index}>
            <div className="card-info">
              <h4>Sheldon Cooper</h4>
              <p>1234 5678 9012 3456</p>
              <p>Exp: 12/24</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card-actions">
        <button>Show PIN</button>
        <button>Card Details</button>
        <button>Freeze Card</button>
      </div>

      <footer className="card-settings">
        <button>Block Card</button>
        <button>Limits</button>
        <button>Delete Card</button>
      </footer>

      {showModal && <AddCardModal onClose={handleModalToggle} />}
    </div>
  );
};

export default Cards;
