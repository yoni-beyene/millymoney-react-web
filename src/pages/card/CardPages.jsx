import Cards from "../../components/card/Cards";
import Header from "../../components/shared/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
const CardsPage = () => {
  return (
    <div className="home-container">
      <Header activeTab="cards" />
      <main className="content p-5">
        <div className="d-flex justify-content-between mb-4">
          <h2>Card</h2>
          <FontAwesomeIcon icon={faBell} />
        </div>
        <Cards />
      </main>
    </div>
  );
};

export default CardsPage;
