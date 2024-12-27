import Header from "../../components/shared/header/Header";
import StatisticsChart from "../../components/statistics/StatisticsChart";

const StatisticsPage = () => {
  return (
    <div className="home-container">
      <Header activeTab="statistics" />
      <StatisticsChart />
    </div>
  );
};
export default StatisticsPage;
