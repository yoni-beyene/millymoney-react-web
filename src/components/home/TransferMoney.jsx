import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./home.scss";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import HTTPService from "../../services/shared/HTTPService";
import LoadingPage from "../shared/loadingPage/LoadingPage";
const TransferMoney = ({ setHomeContent }) => {
  const formikRef = useRef();

  const validationSchema = Yup.object({
    transferTo: Yup.string(),
    bankName: Yup.string().required("Required"),
    accountNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be a number")
      .required("Required"),
    recipientName: Yup.string().required("Required"),
    reference: Yup.string().optional(),
  });

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [banks, setBanks] = useState([]);
  const [accountNumberDetail, setAccountNumberDetail] = useState([]);

  const fetchNameFromAPI = (accountNumber) => {
    if (accountNumber === "") {
      console.log("Error");
    } else {
      setIsLoading(true);
      HTTPService.post("/bank/bank-customer/1/" + accountNumber)
        .then((res) => {
          setAccountNumberDetail(res.data.customer);
          formikRef.current.setFieldValue(
            "recipientName",
            res.data.customer.firstName +
              " " +
              res.data.customer.middleName +
              " " +
              res.data.customer.lastName
          );
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

  // const selectBank = (bank) => {
  //   setIsLoading(true);
  // };
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
            onSubmit={(values) => console.log(values)}
          >
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="row mb-3">
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
                  <div className="col-md-6">
                    <label
                      className="form-label money-transfer-input-label"
                      htmlFor="bank-name"
                    >
                      Bank Name
                    </label>
                    <Field
                      as="select"
                      name="bankName"
                      className="form-select money-transfer-input"
                      id="bank-name"
                    >
                      <option value="">Select Bank</option>
                      {banks.map((bank) => (
                        <option value={bank.id} key={bank.id}>
                          {bank.bankName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="bankName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="row mb-3">
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
                          className="primary-button ms-3 rounded"
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
                    />
                    <ErrorMessage
                      name="recipientName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="mb-3">
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
                <div className="w-100 d-flex justify-content-center mt-5">
                  <div style={{ width: "400px" }}>
                    <PrimaryButton
                      text="Send Money"
                      onClick={() => {}}
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
