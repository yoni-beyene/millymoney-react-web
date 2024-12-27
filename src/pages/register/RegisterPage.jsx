import { useState } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import PrimaryButton from "../../components/shared/primaryButton/PrimaryButton";
import HTTPService from "../../services/shared/HTTPService";
import "./RegisterPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import WelcomeCarousel from "../../components/welcomeCarousel/WelcomeCarousel";
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const RegisterPage = () => {
  const optData = useSelector((state) => state.global.optData);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="login-page-container">
            <div
              className="container justify-content-center d-flex align-items-center"
              style={{ height: "100vh" }}
            >
              <div className="login-container px-5">
                <div className="topWrapper d-flex">
                  <button
                    onClick={() => navigation.navigate("login")}
                    className="backButton"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} fontSize={25} />
                  </button>
                </div>
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
                      `/sender/onboard-new/${optData.senderId}`,
                      requestObj
                    )
                      .then((res) => {
                        console.log(res);
                        setIsLoading(false);
                        alert(
                          `Account created for ${values.firstName} ${values.lastName}`
                        );
                      })
                      .catch((err) => {
                        setIsLoading(false);
                        alert(err.response.data.err);
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
                    <div className="inputWrapper">
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
                        <button
                          type="button"
                          onClick={() => setModalVisible(true)}
                          className="termsText"
                        >
                          I accept the terms and privacy policy
                        </button>
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

                {modalVisible && (
                  <div className="modalContainer">
                    <div className="modalContent">
                      <h2 className="modalTitle">Terms and Conditions</h2>
                      <div className="modalText">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed pulvinar dolor vitae metus ultricies, non
                          porttitor nisi sollicitudin. Mauris non risus id
                          sapien suscipit consectetur. Nulla facilisi.
                        </p>
                        <p>
                          Quisque pharetra erat ut est feugiat, ut tincidunt
                          sapien posuere. Donec id lacus nec velit porttitor
                          luctus ac eget nisl.
                        </p>
                      </div>
                      <button
                        onClick={() => setModalVisible(false)}
                        className="closeButton"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
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
