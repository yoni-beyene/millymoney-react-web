import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import CountryFlag from "react-world-flags";
import { countries } from "../../data/countries";
import HTTPService from "../../services/shared/HTTPService";
import { useDispatch } from "react-redux";
import "./LoginPage.scss";

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
                  const userLoginData = {
                    isUserRegistered: true,
                    otp: res.data.otp,
                    message: "user found",
                    phoneNumber: dialCode + values.phone,
                  };
                  navigator.clipboard.writeText(res.data.otp.otpValue);
                  alert("OTP copied to clipboard!");
                  //   dispatch(updateOptData(userLoginData));
                  navigation.navigate("verificationScreen");
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
                      <CountryFlag code={isoCode} className="flag" />
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
                  <button className="btn btn-primary"></button>
                </div>
              </div>
            )}
          </Formik>
          {modalVisible && (
            <div
              className="modal-overlay"
              onClick={() => setModalVisible(false)}
            >
              <div className="modal-view">
                <div className="modal-content">
                  {countries.map((country) => (
                    <button
                      className="country-box"
                      key={country.isoCode}
                      onClick={() => {
                        setCountry(country.country);
                        setIsoCode(country.isoCode);
                        setDialCode(country.dialCode);
                        setModalVisible(false);
                      }}
                    >
                      <div className="country-box-left">
                        <CountryFlag code={country.isoCode} className="flag" />
                      </div>
                      <div className="country-box-right">
                        {country.country} ({country.dialCode})
                      </div>
                    </button>
                  ))}
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
