import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TransferMoney = ({ setHomeContent }) => {
  const validationSchema = Yup.object({
    transferTo: Yup.string().required("Required"),
    bankName: Yup.string().required("Required"),
    accountNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be a number")
      .required("Required"),
    recipientName: Yup.string().required("Required"),
    reference: Yup.string().optional(),
  });
  return (
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
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Transfer To</label>
                  <Field as="select" name="transferTo" className="form-select">
                    <option value="">Select Transfer Type</option>
                    <option value="account">Transfer to Account</option>
                  </Field>
                  <ErrorMessage
                    name="transferTo"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Bank Name</label>
                  <Field as="select" name="bankName" className="form-select">
                    <option value="">Select Bank</option>
                    <option value="bank1">Bank Name</option>
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
                  <label className="form-label">Account Number</label>
                  <Field
                    type="text"
                    name="accountNumber"
                    className="form-control"
                    placeholder="Account Number"
                  />
                  <ErrorMessage
                    name="accountNumber"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Recipient Name</label>
                  <Field
                    type="text"
                    name="recipientName"
                    className="form-control"
                    placeholder="Recipient Name"
                  />
                  <ErrorMessage
                    name="recipientName"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Reference</label>
                <Field
                  type="text"
                  name="reference"
                  className="form-control"
                  placeholder="Reference"
                />
              </div>
              <div className="w-100 d-flex justify-content-center mt-5">
                <div style={{ width: "400px" }}>
                  <PrimaryButton
                    text="Save Card"
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
  );
};
TransferMoney.propTypes = {
  setHomeContent: PropTypes.func.isRequired,
};
export default TransferMoney;
