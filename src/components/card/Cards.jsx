import { useState, useEffect } from "react";
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
import HTTPService from "../../services/shared/HTTPService";
import { useSelector } from "react-redux";
import LoadingPage from "../shared/loadingPage/LoadingPage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const Cards = () => {
  const [cardList, setCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const senderId = useSelector((state) => state.global.senderId);

  const addNewCard = () => {
    setIsLoading(true);
    HTTPService.post(`/tokenization/init-new/${senderId}`)
      .then((res) => {
        window.location.href = `https://hostedmicroform.ecopiavaluechain.com/microform?reference=${res?.data?.cardId}&serviceType=tokenize`;
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        alert(err.response.data.err);
      });
  };

  useEffect(() => {
    readCardList();
  }, []);

  const readCardList = () => {
    HTTPService.post(`/tokenization/sender-cards/${senderId}`)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data.savedCards);
        setCardList(res.data.savedCards);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data.err);
      });
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveIndex(newIndex);
  };
  return (
    <main className="content p-5">
      {isLoading ? (
        <LoadingPage />
      ) : (
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
            {" "}
            <Carousel>
              {cardList.map((card) => (
                <div
                  key={card.cardId}
                  className="img-fluid custom-card d-flex justify-content-end align-items-start p-3 flex-column"
                  style={{ width: "200px", height: "200px" }}
                >
                  <p> {card.cardPrefix}XXXXXXXXXX</p>
                  <p> {card.expiry}XXXXX</p>
                </div>
              ))}
            </Carousel>
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
              <FontAwesomeIcon icon={faChevronRight} color="#924ffa" />
            </div>
            <div className="setting my-2 d-flex justify-content-between">
              <div className="d-flex">
                <div className="me-3">
                  <FontAwesomeIcon icon={faGauge} />
                </div>
                Limits{" "}
              </div>
              <FontAwesomeIcon icon={faChevronRight} color="#924ffa" />
            </div>
            <div className="setting my-2 d-flex justify-content-between">
              <div className="d-flex">
                <div className="me-3">
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                Delete Card
              </div>
              <FontAwesomeIcon icon={faChevronRight} color="#924ffa" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
Cards.propTypes = {
  addNewCard: PropTypes.func.isRequired,
};
export default Cards;
