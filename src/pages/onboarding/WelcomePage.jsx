// import React, { useState } from "react";
// import "./WelcomePage.scss";

// const WelcomePage = () => {
//   const [currentStep, setCurrentStep] = useState(0);

//   const welcomeMessages = [
//     {
//       id: 1,
//       title: "Welcome to Milly Money!",
//       description: "Send money anywhere, anytime, securely.",
//       image:
//         "https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
//     },
//     {
//       id: 2,
//       title: "Quick money transfer in wallet",
//       description:
//         "Send and receive money instantly with just a few taps, directly into your wallet.",
//       image:
//         "https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
//     },
//     {
//       id: 3,
//       title: "Always track your transactions",
//       description:
//         "Monitor your transaction history in real-time and stay updated.",
//       image:
//         "https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
//     },
//   ];

//   const handleNext = () => {
//     if (currentStep < welcomeMessages.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handleSkip = () => {
//     console.log("Skipped!");
//   };

//   return (
//     <div className="welcome-page-container">
//       <div className="container p-5 mt-5">
//         <div className="d-flex w-100 justify-content-center">
//           <img src={MillyMoney} alt="MillyMoney Logo" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomePage;

import React, { useState } from "react";
import SlideScreens from "./SlideScreens";
import "./WelcomePage.scss";

const WelcomePage = ({ navigation }) => {
  const slides = [
    {
      id: 1,
      title: "Welcome to Milly Money!",
      description: "Send money anywhere, anytime, securely.",
      image: "/assets/onboarding-screen-1.png", // Use relative path for web assets
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

  // const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkip = () => {
    // dispatch(showOnboardingScreen(false));
    navigation.replace("/login"); // Adjust for React Router navigation
  };

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      // dispatch(showOnboardingScreen(false));
      navigation.replace("/login");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace("/login");
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
