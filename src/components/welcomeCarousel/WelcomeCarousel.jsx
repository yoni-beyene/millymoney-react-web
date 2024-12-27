import "./WelcomePage.scss";

const WelcomeCarousel = () => {
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
  return (
    <div
      id="welcome-page-carousel"
      className="carousel slide w-100 h-100"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#welcome-page-carousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#welcome-page-carousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#welcome-page-carousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner h-100">
        {slides.map((slide, index) => (
          <div
            className={`carousel-item  h-100 ${index === 0 ? "active" : ""}`}
            key={slide.id}
          >
            <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
              <img
                src={slide.image}
                className="img-fluid"
                alt="Slide 1"
                style={{ objectFit: "cover" }}
              />
              <div className="text-center mt-5">
                <h5>{slide.title}</h5>
                <p>{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#welcome-page-carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#welcome-page-carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default WelcomeCarousel;
