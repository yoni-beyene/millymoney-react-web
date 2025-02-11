import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import HTTPService from "../../services/shared/HTTPService";
import { useDispatch } from "react-redux";
import "./LoginPage.scss";
import PrimaryButton from "../../components/shared/primaryButton/PrimaryButton";
import { globalActionType } from "../../store/action/shared/globalAction";
import WelcomeCarousel from "../../components/welcomeCarousel/WelcomeCarousel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
const loginSchema = yup.object({
  phone: yup
    .string()
    .min(8, "Phone Number too Short")
    .max(14, "Phone number too Long")
    .required(),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="login-page-container">
            <div
              className="container justify-content-center d-flex align-items-center"
              style={{ height: "100vh" }}
            >
              <div className="login-container w-50 px-5 card py-5">
                <div className="logo-wrapper">
                  <img src="/assets/logo.png" alt="Logo" className="logo" />
                </div>
                <div className="hero">
                  <h1 className="hero-text">Welcome</h1>
                </div>
                <div className="form-section">
                  <h2 className="leader-text">Login</h2>
                  <p className="small-text">
                    Enter Your phone number to Continue.
                  </p>
                </div>
                <Formik
                  initialValues={{ phone: "" }}
                  validationSchema={loginSchema}
                  onSubmit={(values) => {
                    debugger;
                    console.log(values);
                    setIsLoading(true);
                    HTTPService.post(`/sender/validate-sender/+${values.phone}`)
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
                    <div className="w-100">
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
                        value={props.values.phone}
                        onBlur={props.handleBlur("phone")}
                        onChange={props.handleChange("phone")}
                      />
                      <div className="input-wrapper">
                        <div className="input-wrapper-phone">
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
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-md-6 position-relative d-flex align-items-center justify-content-center bg-dark text-white"
          style={{ height: "100vh" }}
        >
          <WelcomeCarousel />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
