import { useState, useEffect } from "react";
import "./Cards.scss";
import HTTPService from "../../services/shared/HTTPService";
import { useSelector } from "react-redux";
import LoadingPage from "../shared/loadingPage/LoadingPage";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import visa from "../../assets/visa.png";
import mastercard from "../../assets/mastercard.png";

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
        setCardList(res.data.savedCards);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data.err);
      });
  };

  return (
    <div className="w-100">
      <header className="header d-flex justify-content-end">
        <div style={{ width: "200px" }}>
          <PrimaryButton
            text="+ Add Card"
            onClick={() => addNewCard()}
            isLoading={false}
          />
        </div>
      </header>
      {isLoading ? (
        <LoadingPage />
      ) : cardList.length === 0 ? (
        <div>
          <h1 className="text-danger text-center">No Card found</h1>
        </div>
      ) : (
        <>
          <div className="row">
            {cardList.map((card) => (
              <div key={card.cardId} className="col-4 mt-3 px-0">
                <div
                  className="w-100"
                  style={{
                    height: "250px",
                    backgroundImage: "url(/assets/card.png)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="d-flex align-items-start justify-content-end px-4 w-100 h-100 flex-column">
                    {}{" "}
                    <img
                      src={card.cardType === "VISA" ? visa : mastercard}
                      style={{
                        width: "100px",
                        position: "relative",
                        top: "-110px",
                      }}
                    />
                    <h4> {card.cardPrefix}XXXXXXXXXX</h4>
                    <h5> {card.expiry}XXXXX</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
Cards.propTypes = {};
export default Cards;
