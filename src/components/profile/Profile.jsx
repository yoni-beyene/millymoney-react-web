import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faBell,
  faPowerOff,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Profile.scss";
import user from "../../assets/images/user-icon.jpeg";
import { useSelector } from "react-redux";

import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import HTTPService from "../../services/shared/HTTPService";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import { useState } from "react";

const Profile = () => {
  const userData = useSelector((state) => state.global.sender);
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = yup.object({
    firstName: yup
      .string()
      .min(3, "Name too Short")
      .required("First Name Required"),
    lastName: yup
      .string()
      .min(3, "Name too Short")
      .required("Last Name Required"),
    email: yup.string().email("Invalid Email Format"),
    image: yup.mixed().nullable(),
  });
  const onSubmitForm = (values) => {
    setIsLoading(true);
    const formData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    };
    HTTPService.post(`/sender/update-basic-info/${userData.senderId}`, formData)
      .then((res) => {
        console.log(res);
        if (values.image) {
          const formDataWithImage = new FormData();

          formDataWithImage.append("profile", values.image);

          uploadImage(formDataWithImage);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const uploadImage = (formDataWithImage) => {
    HTTPService.fileUpload(
      `/sender/add_profile/${userData.senderId}`,
      formDataWithImage
    )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <main className="content p-5">
      <h1>Profile</h1>
      <div className="card ">
        <div className="profile-page w-100">
          <div className="profile-header">
            <img className="profile-avatar" src={user} alt="Profile Avatar" />
            <h2 className="profile-name">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="profile-email">
              {userData.phoneNumber}
              <br /> {userData.email}
            </p>
          </div>

          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed profile-option"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <FontAwesomeIcon icon={faUser} className="me-3" />
                  <span>Personal Details</span>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
              >
                <div className="accordion-body">
                  <Formik
                    initialValues={{
                      firstName: userData.firstName,
                      lastName: userData.lastName,
                      email: userData.email,
                      image: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onSubmitForm(values)}
                  >
                    {({ handleSubmit, setFieldValue }) => (
                      <div>
                        <div className="row mb-3">
                          <div className="col-md-12">
                            <label className="form-label" htmlFor="firstName">
                              First Name
                            </label>
                            <Field
                              type="text"
                              name="firstName"
                              className="form-control money-transfer-input"
                              id="firstName"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-md-12">
                            <label className="form-label" htmlFor="lastName">
                              Last Name
                            </label>
                            <Field
                              type="text"
                              name="lastName"
                              className="form-control money-transfer-input"
                              id="lastName"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-md-12">
                            <label className="form-label" htmlFor="email">
                              Email
                            </label>
                            <Field
                              type="email"
                              name="email"
                              className="form-control money-transfer-input"
                              id="email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-md-12">
                            <label className="form-label" htmlFor="image">
                              Profile Image
                            </label>
                            <input
                              type="file"
                              className="form-control money-transfer-input"
                              id="image"
                              onChange={(event) =>
                                setFieldValue(
                                  "image",
                                  event.currentTarget.files[0]
                                )
                              }
                            />
                            <ErrorMessage
                              name="image"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="w-100 d-flex justify-content-center mt-5">
                          <div style={{ width: "400px" }}>
                            <PrimaryButton
                              text="Update Profile"
                              onClick={handleSubmit}
                              isLoading={isLoading}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-options">
            <div className="profile-option">
              <FontAwesomeIcon icon={faCreditCard} />
              <span>Terms of use</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div className="profile-option">
              <FontAwesomeIcon icon={faBell} />
              <span>Privacy policy</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>

            <div className="profile-option logout">
              <FontAwesomeIcon icon={faPowerOff} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
