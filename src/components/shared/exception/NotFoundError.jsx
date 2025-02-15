import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";

const NotFoundError = () => {
  return (
    <div className="container">
      <div className="mt-3 h-100 mx-3">
        <div className="row mb-5">
          <div className="col-md-1 col-sm-12 px-0 text-center text-white notification-icon-container d-flex justify-content-center py-2 bg-warning">
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
            </span>
          </div>
          <div
            className="col-md-11 col-sm-12 px-0"
            style={{ textAlign: "left" }}
          >
            <Alert variant="light" className="m-0 alert-custom-radius">
              <Alert.Heading className="heading-4 pt-3 warning-alert-text">
                Page Not Found
              </Alert.Heading>
              <p>
                Sorry, the page you are looking for might be unavailable or does
                not exist.
              </p>
              <span
                className="error-technical-info user-select-none"
                style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Make sure the URL is correct or navigate back to the home page.
              </span>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundError;
