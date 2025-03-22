import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./home.scss";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HTTPService from "../../services/shared/HTTPService";
import LoadingPage from "../shared/loadingPage/LoadingPage";
import { sendMoneyAction } from "../../store/action/sendMoneyAction";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TransferMoney = () => {
  const navigate = useNavigate();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const recipientId = query.get("recipient-id");
  const formikRef = useRef();
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("Amount required")
      .min(10, "Amount must be at least 10")
      .max(3000, "Amount must be less than 3000"),
    transferTo: Yup.string(),
    bankId: Yup.number().required("Please select the bank"),
    accountNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be a number")
      .required("Account number is required"),
    recipientName: Yup.string().required("Plase verify the account number"),
    reference: Yup.string(),
  });
  const amount = useSelector((state) => state.sendeMoney.amount);
  const senderId = useSelector((state) => state.global.senderId);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState(null);
  const [banks, setBanks] = useState([]);
  const [recipient, setRecipient] = useState();
  const [recipientList, setRecipientList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    readAllBanks();
  }, []);

  const readAllBanks = () => {
    HTTPService.post("/bank/all-banks-with-exchange")
      .then((res) => {
        setBanks(res.data.banks);
        readAllRecipient();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.err ?? "Error occured please try again!"
        );
      });
  };

  const readAllRecipient = () => {
    HTTPService.post(`/sender/recipient/get-recipient/${senderId}`)
      .then((res) => {
        setIsLoading(false);
        setRecipientList(res.data.recipients);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.err ?? "Error occured please try again!"
        );
      });
  };

  const fetchNameFromAPI = (accountNumber) => {
    if (accountNumber === "" || selectedBank === null) {
      toast.warning("Account number required");
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
          toast.error(
            err?.response?.data?.err ?? "Error occured please try again!"
          );
          setIsLoading(false);
        });
    }
  };
  const selectTransferHandler = (recipientId) => {
    if (recipientList.length === 0 || banks.length === 0) {
      return;
    } else {
      const recipientTemp = recipientList.filter(
        (r) => r.recipientId === recipientId
      )[0];
      if (recipientTemp) {
        formikRef.current.setFieldValue(
          "transferTo",
          recipientTemp.recipientId
        );
        setSelectedBank(
          banks.filter((b) => b.bankId === recipientTemp.bankId)[0]
        );
        formikRef.current.setFieldValue("bankId", recipientTemp.bankId);
        formikRef.current.setFieldValue(
          "accountNumber",
          recipientTemp.accountNumber
        );
        setIsLoading(true);
        HTTPService.post(
          "/bank/bank-customer/" +
            recipientTemp.bankId +
            "/" +
            recipientTemp.accountNumber
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
            toast.error(
              err?.response?.data?.err ?? "Error occured please try again!"
            );
            setIsLoading(false);
          });
      }
    }
  };
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
          parseFloat(values.amount) *
          parseFloat(selectedBank.ExchangeRates[0].rate),
        reason: values?.reference,
        appliedFee: "0",
      },
    });
    dispatch({
      type: sendMoneyAction.UPDATE_AMOUNT,
      amount: values.amount,
    });
    navigate("/payment-review");
  };

  useEffect(() => {
    if (recipientId && recipientList.length !== 0) {
      selectTransferHandler(recipientId);
    }
  }, [recipientList]);
  return (
    <>
      {isLoading && <LoadingPage />}
      <main className="content p-5">
        <div className="recipient-container card p-5">
          <div className="header">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={() => navigate(-1)}
              className="back-icon"
            />
            <h2>Transfer Money</h2>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <Formik
            innerRef={formikRef}
            initialValues={{
              amount: amount,
              transferTo: "",
              bankId: "",
              accountNumber: "",
              recipientName: "",
              reference: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmitForm(values)}
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      className="form-label money-transfer-input-label"
                      htmlFor="amount"
                    >
                      Amount
                    </label>

                    <Field
                      type="number"
                      name="amount"
                      className="form-control money-transfer-input"
                      placeholder="Enter amount"
                      id="amount"
                    />
                    <ErrorMessage
                      name="amount"
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
                      onChange={(e) => {
                        selectTransferHandler(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select Transfer Type
                      </option>
                      {recipientList.map((recipient) => (
                        <option
                          key={recipient.recipientId}
                          value={recipient.recipientId}
                        >
                          {recipient.firstName} ({recipient.accountNumber})
                        </option>
                      ))}
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
                                key={bank.bankId}
                                className="dropdown-item"
                                onClick={() => {
                                  setFieldValue("bankId", bank.bankId);
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
                      name="bankId"
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
                        type="type"
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
                      onClick={() => {
                        handleSubmit();
                      }}
                      isLoading={false}
                    />
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
};

export default TransferMoney;
