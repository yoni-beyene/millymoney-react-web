import { useState } from "react";
import "./Cards.scss";
import AddCardModal from "./AddCardModal";
const Cards = () => {
  const cardList = [
    {
      image: "./assets/Card 3 Visa.png",
      holderName: "Sheldon Cooper",
      id: 1,
    },
    {
      image: "./assets/Card 3 Visa.png",
      holderName: "Sheldon Cooper",
      id: 2,
    },
    {
      image: "./assets/Card 3 Visa.png",
      holderName: "Sheldon Cooper",
      id: 3,
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveIndex(newIndex);
  };
  return (
    <div className="cards-container w-100">
      <header className="header">
        <h1>Cards</h1>
        <button className="add-card" onClick={() => handleModalToggle()}>
          + Add Card
        </button>
      </header>
      <AddCardModal show={showModal} onClose={handleModalToggle} />
      <div className="cards-carousel" onScroll={handleScroll}>
        {cardList.map((card) => (
          <img
            key={card.id}
            src={card.image}
            alt={card.holderName}
            className="img-fluid custom-card"
          />
        ))}
      </div>
      <div className="card-carousel-indicators">
        {cardList.map((card, index) => (
          <span
            key={card.id + index}
            className={`indicator ${activeIndex === index ? "active" : ""}`}
          ></span>
        ))}
      </div>
      <div className="card-actions">
        <button>Show PIN</button>
        <button>Card Details</button>
        <button>Freeze Card</button>
      </div>
      <div className="card-settings">
        <div className="setting">Block Card</div>
        <div className="setting">Limits</div>
        <div className="setting">Delete Card</div>
      </div>
    </div>
  );
};

export default Cards;
