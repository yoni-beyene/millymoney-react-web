import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../../components/shared/primaryButton/PrimaryButton";
import HTTPService from "../../services/shared/HTTPService";
import "./VerificationPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { globalActionType } from "../../store/action/shared/globalAction";
import WelcomeCarousel from "../../components/welcomeCarousel/WelcomeCarousel";
import { useNavigate, useLocation } from "react-router-dom";

const VerificationPage = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const inputs = useRef([]);
  const dispatch = useDispatch();

  const optData = useSelector((state) => state.global.optData);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    if (text.length === 6) {
      const values = [...text.padEnd(6, "").slice(0, 6)];
      setCode(values);
      values.forEach((value, i) => {
        if (inputs.current[i]) {
          inputs.current[i].value = value;
        }
      });
    } else {
      newCode[index] = text[0];
      setCode(newCode);
      if (text && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleResend = async () => {
    try {
      setTimer(60);
      setResendDisabled(true);

      const res = await HTTPService.post(
        `/sender/validate-sender/${optData.otp.phoneNumber}`
      );
      alert("OTP resent successfully.");
      dispatch({
        type: globalActionType.SAVE_OPT_DATA,
        optData: res.data,
      });
    } catch (error) {
      alert("Failed to resend OTP.");
      console.error(error);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    const isCodeInvalid = code.some((item) => !item);
    if (isCodeInvalid) {
      alert("Verification code is required");
      setIsLoading(false);
    } else {
      try {
        const verifyOptRequest = {
          deviceName: "Browser",
          deviceType: "DESKTOP",
          appVersion: "1.0.0",
          screenHeight: window.innerHeight,
          screenWidth: window.innerWidth,
          ipAddress: "127.0.0.1",
          deviceModel: "WEB",
        };
        const res = await HTTPService.post(
          `/sender/verify-otp/${optData.otp.phoneNumber}/${code.join("")}`,
          verifyOptRequest
        );

        setIsLoading(false);
        dispatch({
          type: globalActionType.SAVE_TOKEN,
          accessToken: res.data.token,
          senderId: res.data.sender.senderId,
          sender: res.data.sender,
        });

        if (optData.userExists) {
          navigate("/home");
        } else {
          navigate("/fill-in");
        }
      } catch (err) {
        setIsLoading(false);
        alert("Verification failed.");
        console.error(err);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

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
                  <h1>Verification Code</h1>
                  <p>We have sent the verification code to your phone.</p>
                </div>
                <div className="inputBoxes w-100">
                  {code.map((value, index) => (
                    <div key={index} className="singleBox">
                      <input
                        ref={(el) => (inputs.current[index] = el)}
                        type="text"
                        maxLength={index === 0 ? 6 : 1}
                        value={value}
                        onChange={(e) => handleChange(e.target.value, index)}
                        className="boxInput"
                      />
                    </div>
                  ))}
                </div>
                <div className="resendSection">
                  <span className="timerText">{formatTime(timer)}</span>
                  <button
                    className={`resendButton ${
                      resendDisabled ? "disabled" : ""
                    }`}
                    disabled={resendDisabled}
                    onClick={handleResend}
                  >
                    Resend
                  </button>
                </div>
                <div className="confirmSection w-75">
                  <PrimaryButton
                    text="Verify"
                    onClick={handleVerify}
                    isLoading={isLoading}
                  />
                </div>
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

export default VerificationPage;
