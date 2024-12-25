import { useState } from "react";
import { globalActionType } from "../../store/action/shared/globalAction";
import SlideScreens from "../../components/slideScreens/SlideScreens";
import "./WelcomePage.scss";
import { useDispatch } from "react-redux";

const WelcomePage = () => {
  const slides = [
    {
      id: 1,
      title: "Welcome to Milly Money!",
      description: "Send money anywhere, anytime, securely.",
      image: "/assets/onboarding-screen-1.png",
    },
    {
      id: 2,
      title: "Quick money transfer in wallet",
      description:
        "Send and receive money instantly with just a few taps, directly into your wallet.",
      image: "/assets/onboarding-screen-2.png",
    },
    {
      id: 3,
      title: "Always track your transactions",
      description:
        "Monitor your transaction history in real-time and stay updated.",
      image: "/assets/onboarding-screen-3.png",
    },
  ];

  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkip = () => {
    dispatch({
      type: globalActionType.SHOW_UPDATE_WELCOME_PAGE,
      SHOW_UPDATE_WELCOME_PAGE: true,
    });
    navigation.replace("/login"); // Adjust for React Router navigation
  };

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      dispatch({
        type: globalActionType.SHOW_UPDATE_WELCOME_PAGE,
        SHOW_UPDATE_WELCOME_PAGE: true,
      });
      navigation.replace("/login");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <div className="welcome-page-container">
      <SlideScreens
        slide={slides[currentIndex]}
        currentIndex={currentIndex}
        handleNext={handleNext}
        handleSkip={handleSkip}
        totalDots={slides.length}
      />
    </div>
  );
};

export default WelcomePage;
