import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import PrimaryButton from "../../components/shared/primaryButton/PrimaryButton";
import HTTPService from "../../services/shared/HTTPService";
import "./RegisterPage.scss";
import WelcomeCarousel from "../../components/welcomeCarousel/WelcomeCarousel";
import { useNavigate } from "react-router-dom";
import { globalActionType } from "../../store/action/shared/globalAction";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const optData = useSelector((state) => state.global.optData);
  const senderId = useSelector((state) => state.global.senderId);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="login-page-container ">
            <div
              className="container justify-content-center d-flex align-items-center"
              style={{ height: "100vh" }}
            >
              <div className="login-container px-5 w-50 card px-5 py-5">
                <div className="hero">
                  <h1 className="heroText">Create Account</h1>
                  <p className="subHero">
                    Please enter your information to finish creating your
                    account.
                  </p>
                </div>
                <Formik
                  initialValues={{ firstName: "", lastName: "", email: "" }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    setIsLoading(true);
                    const requestObj = {
                      firstName: values.firstName.trim(),
                      lastName: values.lastName.trim(),
                      email: values.email.trim(),
                      phoneNumber: optData.otp.phoneNumber,
                    };

                    HTTPService.post(
                      `/sender/onboard-new/${senderId}`,
                      requestObj
                    )
                      .then((res) => {
                        dispatch({
                          type: globalActionType.SAVE_USER_DATA,
                          sender: {
                            email: values.email,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            phoneNumber: optData.otp.phoneNumber,
                            senderId: senderId,
                          },
                        });
                        navigate("/home");
                        setIsLoading(false);
                      })
                      .catch((err) => {
                        setIsLoading(false);
                        toast.error(
                          err?.response?.data?.err ??
                            "Error occured please try again!"
                        );
                      });
                  }}
                >
                  {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => (
                    <div className="inputWrapper w-75">
                      <div className="inputArea">
                        <label
                          htmlFor="firstName"
                          className="inputAreaText text-start w-100"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          className="textInputMedium"
                          placeholder="First Name"
                          onChange={handleChange("firstName")}
                          value={values.firstName}
                        />
                        {touched.firstName && errors.firstName && (
                          <p className="errorText">{errors.firstName}</p>
                        )}
                      </div>
                      <div className="inputArea">
                        <label
                          htmlFor="lastName"
                          className="inputAreaText text-start w-100"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          className="textInputMedium"
                          placeholder="Last Name"
                          onChange={handleChange("lastName")}
                          value={values.lastName}
                        />
                        {touched.lastName && errors.lastName && (
                          <p className="errorText">{errors.lastName}</p>
                        )}
                      </div>
                      <div className="inputArea">
                        <label
                          htmlFor="email"
                          className="inputAreaText text-start w-100"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          className="textInputMedium"
                          placeholder="Email"
                          onChange={handleChange("email")}
                          value={values.email}
                          type="email"
                        />
                        {touched.email && errors.email && (
                          <p className="errorText">{errors.email}</p>
                        )}
                      </div>
                      <div className="termsContainer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => setIsChecked(!isChecked)}
                          className="checkbox"
                        />
                        <a
                          type="button"
                          href="/terms-condition"
                          className="termsText"
                          target="_blank"
                        >
                          I accept the terms and privacy policy
                        </a>
                      </div>
                      <div className="confirmSection">
                        <PrimaryButton
                          text="Create Account"
                          onClick={handleSubmit}
                          isLoading={isLoading}
                          disabled={!isChecked}
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

export default RegisterPage;
