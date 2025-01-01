import { useState } from "react";
import "./Cards.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCreditCard,
  faEllipsis,
  faGauge,
  faIdCard,
  faTableCellsColumnLock,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Cards = ({ addNewCard }) => {
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
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveIndex(newIndex);
  };
  return (
    <main className="content p-5">
      <div className="cards-container w-100">
        <header className="header">
          <h1>Cards</h1>
          <button className="add-card" onClick={() => addNewCard()}>
            + Add Card
          </button>
        </header>
        <div
          className="cards-carousel w-100 d-flex justify-content-center"
          onScroll={handleScroll}
        >
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
          <button className="card-btn">
            <FontAwesomeIcon icon={faEllipsis} />
            Show PIN
          </button>
          <button className="card-btn">
            <FontAwesomeIcon icon={faCreditCard} />
            Card Details
          </button>
          <button className="card-btn">
            <FontAwesomeIcon icon={faIdCard} />
            Freeze Card
          </button>
        </div>
        <div className="card-settings">
          <div className="setting my-2 d-flex justify-content-between">
            <div className="d-flex">
              <div className="me-3">
                <FontAwesomeIcon icon={faTableCellsColumnLock} />
              </div>
              Block Card
            </div>
            <FontAwesomeIcon icon={faChevronRight} color="#895cfe" />
          </div>
          <div className="setting my-2 d-flex justify-content-between">
            <div className="d-flex">
              <div className="me-3">
                <FontAwesomeIcon icon={faGauge} />
              </div>
              Limits{" "}
            </div>
            <FontAwesomeIcon icon={faChevronRight} color="#895cfe" />
          </div>
          <div className="setting my-2 d-flex justify-content-between">
            <div className="d-flex">
              <div className="me-3">
                <FontAwesomeIcon icon={faTrash} />
              </div>
              Delete Card
            </div>
            <FontAwesomeIcon icon={faChevronRight} color="#895cfe" />
          </div>
        </div>
      </div>
    </main>
  );
};
Cards.propTypes = {
  addNewCard: PropTypes.func.isRequired,
};
export default Cards;
