import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import HTTPService from "../../services/shared/HTTPService";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import LoadingPage from "../shared/loadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const AddRecipient = () => {
  const navigate = useNavigate();

  const formikRef = useRef();
  const senderId = useSelector((state) => state.global.senderId);
  const validationSchema = Yup.object({
    bankName: Yup.number().required("Required"),
    accountNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be a number")
      .required("Required"),
    recipientName: Yup.string().required("Required"),
    nickname: Yup.string().required("Required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Must be a number")
      .required("Required"),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState(null);
  const [banks, setBanks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    HTTPService.get("/bank/all-banks")
      .then((res) => {
        setBanks(res.data.banks);
        setIsLoading(false);
      })
      .catch((err) =>
        toast.error(
          err?.response?.data?.err ?? "Error occured please try again!"
        )
      );
  }, []);

  const fetchNameFromAPI = (accountNumber) => {
    if (accountNumber === "" || selectedBank === null) {
      toast.warning("Account number required");
    } else {
      setIsLoading(true);
      HTTPService.post(
        `/bank/bank-customer/${selectedBank?.bankId}/${accountNumber}`
      )
        .then((res) => {
          formikRef.current.setFieldValue(
            "recipientName",
            `${res.data.customer.firstName} ${res.data.customer.middleName}`
          );
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  };

  const saveRecipient = (values) => {
    setIsLoading(true);
    const formData = {
      firstName: values.recipientName,
      fatherName: "empty",
      title: "Ato",
      gender: "MALE",
      nickName: values.nickname,
      phoneNumber: `+${values.phone}`,
      bankId: selectedBank.bankId,
      email: "tempmail@temp.com",

      accountNumber: values.accountNumber,
    };
    console.log(formData);
    HTTPService.post(`/sender/recipient/new/${senderId}`, formData)
      .then(() => {
        setIsLoading(false);
        navigate("/recipient");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.err ?? "Error occured please try again!"
        );
        setIsLoading(false);
      });
  };

  return (
    <main className="content p-5">
      {isLoading && <LoadingPage />}
      <div className="recipient-container card p-5">
        <div className="header mb-5">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => navigate("/recipient")}
            className="back-icon"
          />
          <h2> Add Recipient</h2>
          <FontAwesomeIcon icon={faBell} />
        </div>
        <Formik
          innerRef={formikRef}
          initialValues={{
            bankId: "",
            accountNumber: "",
            recipientName: "",
            nickname: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => saveRecipient(values)}
        >
          {({ values, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
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
                            <span>{selectedBank.bankName}</span>
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
                                setFieldValue("bankId", bank.id);
                                setSelectedBank(bank);
                                setIsOpen(false);
                              }}
                            >
                              <img
                                src={`https://testmilly.ecopiavaluechain.com/bank/bank-icon/${bank.bankId}`}
                                alt={bank.bankName}
                                className="bank-icon"
                              />
                              <span>{bank.bankName}</span>
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
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Recipient Name</label>
                  <Field
                    type="text"
                    name="recipientName"
                    className="form-control money-transfer-input"
                    readOnly
                  />
                  <ErrorMessage
                    name="recipientName"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nickname</label>
                  <Field
                    type="text"
                    name="nickname"
                    className="form-control money-transfer-input"
                  />
                  <ErrorMessage
                    name="nickname"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <PhoneInput
                    inputProps={{
                      id: "phone-number",
                      name: "phoneNumber",
                      className:
                        "form-control input-required w-100 text-input-large",
                      placeholder: "Phone number",
                    }}
                    country={"Ethiopia"}
                    enableSearch={true}
                    value={values.phone}
                    onChange={(values) => setFieldValue("phone", values)}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="w-100 d-flex justify-content-center mt-5">
                <div style={{ width: "400px" }}>
                  <PrimaryButton
                    text="Save Recipient"
                    onClick={() => saveRecipient(values)}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default AddRecipient;
