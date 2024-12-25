import PropTypes from "prop-types";

const SlideScreens = ({
  slide,
  currentIndex,
  handleNext,
  handleSkip,
  totalDots,
}) => {
  const dots = [];
  for (let i = 0; i < totalDots; i++) {
    dots.push(
      <div
        key={i}
        className={currentIndex === i ? "active-dot" : "inactive-dot"}
      ></div>
    );
  }

  return (
    <div className="container h-100 pb-0 mb-0">
      <div className="top-section flex-column">
        <div className="d-flex w-100 justify-content-center my-5">
          <img src="/images/logos/MillyMoney.png" alt="MillyMoney Logo" />
        </div>
        <img src={slide.image} alt="Slide" className="wallet-image" />
      </div>

      <div className="bottom-section">
        <div>
          <div className="pagination-container">{dots}</div>
          <h2 className="title">{slide.title}</h2>
          <p className="description">{slide.description}</p>
        </div>
        <div className="buttons-container">
          <button className="skip-button" onClick={handleSkip}>
            Skip
          </button>
          <button className="arrow-button" onClick={handleNext}>
            {currentIndex === totalDots - 1 ? "Done" : "→"}
          </button>
        </div>
      </div>
    </div>
  );
};

SlideScreens.propTypes = {
  slide: PropTypes.object.isRequired,
  currentIndex: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleSkip: PropTypes.func.isRequired,
  totalDots: PropTypes.number.isRequired,
};

export default SlideScreens;
