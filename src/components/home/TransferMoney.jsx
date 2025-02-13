import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./home.scss";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HTTPService from "../../services/shared/HTTPService";
import LoadingPage from "../shared/loadingPage/LoadingPage";
import { sendMoneyAction } from "../../store/action/sendMoneyAction";
const TransferMoney = ({ setHomeContent }) => {
  const formikRef = useRef();

  const validationSchema = Yup.object({
    transferTo: Yup.string().optional(),
    bankName: Yup.number().required("Required"),
    accountNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be a number")
      .required("Required"),
    recipientName: Yup.string().required("Required"),
    reference: Yup.string().optional(),
  });
  const amount = useSelector((state) => state.sendeMoney.amount);
  const senderId = useSelector((state) => state.global.senderId);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState(null);
  const [banks, setBanks] = useState([]);
  const [recipient, setRecipient] = useState();

  const fetchNameFromAPI = (accountNumber) => {
    if (accountNumber === "" || selectedBank === null) {
      alert("Error");
    } else {
      setIsLoading(true);
      HTTPService.post(
        "/bank/bank-customer/" + selectedBank?.id + "/" + accountNumber
      )
        .then((res) => {
          formikRef.current.setFieldValue(
            "recipientName",
            res.data.customer.firstName +
              " " +
              res.data.customer.middleName +
              " " +
              res.data.customer.lastName
          );
          setRecipient(res.data.customer);

          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    HTTPService.post("/bank/all-banks-with-exchange")
      .then((res) => {
        setIsLoading(false);
        setBanks(res.data.banks);
      })
      .catch((err) => {
        alert(err.response.data.err);
      });
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmitForm = (values) => {
    dispatch({
      type: sendMoneyAction.UPDATE_NEW_REMIT_FIELDS,
      payload: {
        channel: "BANK",
        channelCode: selectedBank.bankCode,
        exchangeRate: selectedBank.ExchangeRates[0].rate,
        fromCurrency: selectedBank.ExchangeRates[0].exchangeFrom,
        toCurrency: selectedBank.ExchangeRates[0].exchangeTo,
        senderId: senderId,
        bankName: selectedBank.bankName,
        accountNumber: recipient?.accountNumber,
        accountHolderFirstName: recipient?.firstName,
        accountHolderMiddle: recipient?.middleName,
        accountHolderLastName: recipient?.lastName,
        exchangeAmount:
          parseFloat(amount) * parseFloat(selectedBank.ExchangeRates[0].rate),
        reason: values?.reference,
        appliedFee: "0",
      },
    });
    setHomeContent("paymentReview");
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
            <h2>Transfer Money</h2>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <Formik
            innerRef={formikRef}
            initialValues={{
              transferTo: "",
              bankName: "",
              accountNumber: "",
              recipientName: "",
              reference: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmitForm(values)}
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      className="form-label money-transfer-input-label"
                      htmlFor="transfer-to"
                    >
                      Amount
                    </label>
                    <input
                      className="form-control money-transfer-input"
                      readOnly
                      value={amount}
                    />
                    <ErrorMessage
                      name="transferTo"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      className="form-label money-transfer-input-label"
                      htmlFor="transfer-to"
                    >
                      Transfer To
                    </label>
                    <Field
                      as="select"
                      name="transferTo"
                      className="form-select money-transfer-input"
                      id="transfer-to"
                    >
                      <option value="">Select Transfer Type</option>{" "}
                    </Field>
                    <ErrorMessage
                      name="transferTo"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      className="form-label money-transfer-input-label"
                      htmlFor="bank-name"
                    >
                      Bank Name
                    </label>
                    <div>
                      <div className=" form-select money-transfer-input">
                        <div
                          className="dropdown-header"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {selectedBank ? (
                            <div className="selected-option">
                              <img
                                src={`https://testmilly.ecopiavaluechain.com/bank/bank-icon/${selectedBank.bankId}`}
                                alt={selectedBank.bankName}
                                className="bank-icon"
                              />
                              <span>
                                {selectedBank.bankName} -{" "}
                                {selectedBank.ExchangeRates[0].rate} ETB
                              </span>
                            </div>
                          ) : (
                            <span>Select a Bank</span>
                          )}
                        </div>
                        {isOpen && (
                          <div className="dropdown-list">
                            {banks.map((bank) => (
                              <div
                                key={bank.id}
                                className="dropdown-item"
                                onClick={() => {
                                  setFieldValue("bankName", bank.id);
                                  setSelectedBank(bank);
                                  setIsOpen(false);
                                }}
                              >
                                <img
                                  src={`https://testmilly.ecopiavaluechain.com/bank/bank-icon/${bank.bankId}`}
                                  alt={bank.bankName}
                                  className="bank-icon"
                                />
                                <span>
                                  {bank.bankName} - {bank.ExchangeRates[0].rate}{" "}
                                  ETB
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <ErrorMessage
                      name="bankName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      className="form-label money-transfer-input-label"
                      htmlFor="account-number"
                    >
                      Account Number
                    </label>
                    <div className="d-flex w-100 justify-content-between">
                      <Field
                        type="text"
                        name="accountNumber"
                        className="form-control money-transfer-input"
                        placeholder="Account Number"
                        id="account-number"
                      />
                      <div style={{ width: "200px" }}>
                        <button
                          className="primary-outline-btn ms-3 rounded"
                          type="button"
                          onClick={() => fetchNameFromAPI(values.accountNumber)}
                        >
                          <span className="button-text">Verfiy</span>
                        </button>
                      </div>
                    </div>

                    <ErrorMessage
                      name="accountNumber"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className=" row mb-3">
                  <div className="col-md-6">
                    <label
                      className="form-label money-transfer-input-label"
                      htmlFor="recipient-name"
                    >
                      Recipient Name
                    </label>
                    <Field
                      type="text"
                      name="recipientName"
                      className="form-control money-transfer-input"
                      placeholder="Recipient Name"
                      id="recipient-name"
                      readOnly
                    />
                    <ErrorMessage
                      name="recipientName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      className="form-label money-transfer-input-label"
                      htmlFor="reference"
                    >
                      Reference
                    </label>
                    <Field
                      type="text"
                      name="reference"
                      className="form-control money-transfer-input"
                      placeholder="Reference"
                      id="reference"
                    />
                  </div>
                </div>
                <div className="w-100 d-flex justify-content-center mt-5">
                  <div style={{ width: "400px" }}>
                    <PrimaryButton
                      text="Send Money"
                      onClick={() => onSubmitForm(values)}
                      isLoading={false}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
};
TransferMoney.propTypes = {
  setHomeContent: PropTypes.func.isRequired,
};
export default TransferMoney;
