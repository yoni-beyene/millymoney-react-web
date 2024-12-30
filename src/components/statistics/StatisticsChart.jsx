import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const StatisticsChart = () => {
  const barData = {
    labels: ["M", "T", "W", "Th", "F", "S"],
    datasets: [
      {
        label: "Spending",
        data: [200, 100, 300, 250, 150, 50],
        backgroundColor: "rgba(123, 97, 255, 0.6)",
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
      },
    },
  };

  return (
    <main className="content p-5">
      <header className="header">
        <div>
          <h5 className="mb-3">Recipient</h5>
          <h1 className="fw-bold">Total Sent</h1>
          <h2 className="fw-bold text-primary">ETB 1360</h2>
          <div className="d-flex justify-content-start my-4">
            <button className="btn btn-link text-primary fw-bold me-3">
              Received
            </button>
            <button className="btn btn-link text-secondary">Sent</button>
          </div>
        </div>
      </header>
      <div>
        <h6 className="fw-bold">Spending Activity</h6>
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>This Week</span>
              <select className="form-select w-auto">
                <option value="this-week">This Week</option>
                <option value="last-week">Last Week</option>
              </select>
            </div>
            <Bar data={barData} options={barOptions} />
          </div>
          <div className="col-6">
            <div>
              <h3 className="text-primary">ETB 5780.32</h3>
              <p>Average weekly spend</p>
              <h3 className="text-primary">ETB 1970.57</h3>
              <p>Spend this week</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StatisticsChart;
