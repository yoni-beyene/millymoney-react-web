import Cards from "../../components/card/Cards";
import Header from "../../components/shared/header/Header";

const CardsPage = () => {
  return (
    <div className="home-container">
      <Header activeTab="cards" />
      <Cards />
    </div>
  );
};

export default CardsPage;
