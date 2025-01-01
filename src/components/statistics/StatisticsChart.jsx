import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useState } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const StatisticsChart = () => {
  const [activeBtn, setActiveBtn] = useState("received");
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
          <h1 className="mb-3">Recipient</h1>
          <h3 className="fw-bold my-3">Total Sent</h3>
          <h1 className="fw-bold my-3">ETB 1360</h1>
          <div className="d-flex justify-content-start my-4">
            <button
              className={`btn btn-link  me-3 ${
                activeBtn === "received"
                  ? "text-primary fw-bold"
                  : "text-secondary"
              }`}
              onClick={() => setActiveBtn("received")}
            >
              Received
            </button>
            <button
              className={`btn btn-link  me-3 ${
                activeBtn === "sent" ? "text-primary fw-bold" : "text-secondary"
              }`}
              onClick={() => setActiveBtn("sent")}
            >
              Sent
            </button>
          </div>
        </div>
      </header>
      <div className="d-flex align-items-center">
        <h6 className="fw-bold text-primary">Spending Activity</h6>
        <select className="form-select w-auto mx-3">
          <option value="this-week">This Week</option>
          <option value="last-week">Last Week</option>
        </select>
      </div>

      <div className="row">
        <div className="col-6">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="col-6">
          <div className="mx-5">
            <h1>ETB 5780.32</h1>
            <h5>Average weekly spend</h5>
            <div className="my-5">
              <h1>ETB 1970.57</h1>
              <h5>Spend this week</h5>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StatisticsChart;
