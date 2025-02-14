import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HTTPService from "../../services/shared/HTTPService";
import LoadingPage from "../shared/loadingPage/LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons";
const PaymentReview = ({ setHomeContent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [remitId, setRemitId] = useState("");
  const newRemitDetial = useSelector((state) => state.sendeMoney);
  const sendMoneyHandler = () => {
    setIsLoading(true);

    HTTPService.post("/remit/new-remit", newRemitDetial)
      .then((res) => {
        setIsLoading(false);
        setRemitId(res.data.newRemit.remitId);
        window.location.href =
          "https://hostedmicroform.ecopiavaluechain.com/microform?reference=" +
          res.data.newRemit.remitId +
          "&serviceType=transfer";
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data.err);
      });
  };
  return (
    <>
      {isLoading && <LoadingPage />}
      <main className="content p-5">
        <div className="recipient-container card p-5">
          <div className="header">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={() => setHomeContent("default")}
              className="back-icon"
            />
            <div>
              <h2>Review Payment</h2>
            </div>
            <FontAwesomeIcon icon={faBell} />
          </div>

          <div>
            <p className="text-center text-muted">YOU'RE SENDING</p>
            <h3 className="text-center text-primary">
              {newRemitDetial.toCurrency} {newRemitDetial.exchangeAmount}
            </h3>
            <p className="text-center fw-bold">TO</p>
            <h4 className="text-center fw-bold">
              {newRemitDetial.accountHolderFirstName}{" "}
              {newRemitDetial.accountHolderMiddle}{" "}
              {newRemitDetial.accountHolderLastName}
            </h4>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-md-12 d-flex flex-column gap-2">
              <div className="d-flex justify-content-between">
                <span>Bank Name</span>
                <span>{newRemitDetial.bankName}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Receiver Account</span>
                <span>{newRemitDetial.accountNumber}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Recipient Name</span>
                <span>
                  {newRemitDetial.accountHolderFirstName}{" "}
                  {newRemitDetial.accountHolderMiddle}{" "}
                  {newRemitDetial.accountHolderLastName}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Amount</span>
                <span>
                  {newRemitDetial.currencyCode} {newRemitDetial.amount}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Service Charge</span>
                <span></span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Exchange Rate</span>
                <span>
                  {newRemitDetial.toCurrency} {newRemitDetial.exchangeRate}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Exchange Amount</span>
                <span>
                  {newRemitDetial.toCurrency} {newRemitDetial.exchangeAmount}
                </span>
              </div>
              <div className="d-flex justify-content-between fw-bold">
                <span>Total Amount</span>
                <span></span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Reference</span>
                {newRemitDetial.reason ? (
                  <span>{newRemitDetial.reason}</span>
                ) : (
                  <span>- - - - -</span>
                )}
              </div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center mt-5">
            <div style={{ width: "400px" }}>
              <PrimaryButton
                text="Confirm and Send"
                onClick={() => sendMoneyHandler()}
                isLoading={false}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PaymentReview;
