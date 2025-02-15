import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";
import { useRouteError } from "react-router-dom";
import NotFoundError from "./NotFoundError";

const ErrorBoundary = () => {
  const error = useRouteError();
  if (error?.status === 404) {
    return <NotFoundError />;
  } else {
    return (
      <div className="container">
        <div className="mt-3 h-100 mx-3">
          <div className="row mb-5">
            <div
              className="col-md-1 col-sm-12 px-0 text-center text-white notification-icon-container d-flex justify-content-center py-2 bg-danger"
              style={{ backgroundColor: "red" }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <FontAwesomeIcon icon={faBan} size="2x" />
              </span>
            </div>
            <div
              className="col-md-11 col-sm-12 px-0"
              style={{ textAlign: "left" }}
            >
              <Alert variant="light" className="m-0 alert-custom-radius">
                <Alert.Heading className="heading-4 pt-3 danger-alert-text">
                  Oops! Something went wrong.
                </Alert.Heading>
                <p>
                  {" "}
                  We apologize for the inconvenience. It seems there is an issue
                  on our end.
                </p>
                <span
                  className="error-technical-info user-select-none"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  If the problem persists, please contact support for
                  assistance.
                </span>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default ErrorBoundary;
