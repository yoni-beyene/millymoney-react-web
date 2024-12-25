import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import CountryFlag from "react-world-flags";
import { countries } from "../../data/countries";
import HTTPService from "../../services/shared/HTTPService";
import { useDispatch } from "react-redux";
import "./LoginPage.scss";
import PrimaryButton from "../../components/shared/primaryButton/PrimaryButton";
import { globalActionType } from "../../store/action/shared/globalAction";

const loginSchema = yup.object({
  phone: yup
    .string()
    .min(8, "Phone Number too Short")
    .max(14, "Phone number too Long")
    .required(),
});

const LoginPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [country, setCountry] = useState("Ethiopia");
  const [isoCode, setIsoCode] = useState("et");
  const [dialCode, setDialCode] = useState("+251");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="login-page-container">
      <div
        className="container justify-content-center d-flex align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="login-container px-5">
          <div className="logo-wrapper">
            <img src="/assets/logo.png" alt="Logo" className="logo" />
          </div>
          <div className="hero">
            <h1 className="hero-text">Welcome</h1>
          </div>
          <div className="form-section">
            <h2 className="leader-text">Login</h2>
            <p className="small-text">Enter Your phone number to Continue.</p>
          </div>
          <Formik
            initialValues={{ phone: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              setIsLoading(true);
              HTTPService.post(
                `/sender/validate-sender/${dialCode}${values.phone}`
              )
                .then((res) => {
                  navigator.clipboard.writeText(res.data.otp.otpValue);
                  alert("OTP copied to clipboard!");

                  dispatch({
                    type: globalActionType.SAVE_OPT_DATA,
                    optData: res.data,
                  });
                  navigation.navigate("verification");
                  setIsLoading(false);
                })
                .catch(() => {
                  setIsLoading(false);
                });
            }}
          >
            {(props) => (
              <div>
                <div className="input-wrapper">
                  <div className="input-wrapper-country">
                    <button
                      className="country-select"
                      onClick={() => setModalVisible(!modalVisible)}
                    >
                      <CountryFlag
                        code={isoCode}
                        className="flag"
                        style={{
                          height: 30,
                          width: 30,
                        }}
                      />
                      <span className="country-text">{dialCode}</span>
                    </button>
                  </div>
                  <div className="input-wrapper-phone">
                    <input
                      className="text-input-large"
                      placeholder="Phone Number"
                      onChange={props.handleChange("phone")}
                      value={props.values.phone}
                      onBlur={props.handleBlur("phone")}
                      type="text"
                    />
                    <p className="error-text">
                      {props.touched.phone && props.errors.phone}
                    </p>
                  </div>
                </div>
                <div className="action-section">
                  <PrimaryButton
                    text="Login"
                    onClick={props.handleSubmit}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            )}
          </Formik>
          {modalVisible && (
            <div
              className="modal fade show d-block"
              role="dialog"
              onClick={() => setModalVisible(false)}
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Select a Country</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setModalVisible(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="list-group">
                      {countries.map((country) => (
                        <button
                          className="list-group-item list-group-item-action d-flex align-items-center"
                          key={country.isoCode}
                          onClick={() => {
                            setCountry(country.country);
                            setIsoCode(country.isoCode);
                            setDialCode(country.dialCode);
                            setModalVisible(false);
                          }}
                        >
                          <div className="me-3">
                            <CountryFlag
                              code={country.isoCode}
                              className="flag"
                            />
                          </div>
                          <div>
                            <strong>{country.country}</strong> (
                            {country.dialCode})
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setModalVisible(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
