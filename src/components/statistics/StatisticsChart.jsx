import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HTTPService from "../../services/shared/HTTPService";
import LoadingPage from "../shared/loadingPage/LoadingPage";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels
);

const StatisticsChart = () => {
  const senderId = useSelector((state) => state.global.senderId);

  const [totalSent, setTotalSent] = useState(0);
  const [monethsLabel, setMonethsLabel] = useState([]);
  const [monethsValue, setMonethsvalue] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    HTTPService.post("/remit/transaction/five-month-stats/" + senderId)
      .then((res) => {
        setIsLoading(false);
        getMonth(5, res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data.err);
      });
  }, []);

  const getMonth = (count = 5, apiResponse) => {
    const months = [];
    const currentDate = new Date();
    const monthlyTotals = apiResponse.monthlyTotals || {}; // Extract API data
    let totalTemp = 0;
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const monthName = date.toLocaleString("default", { month: "long" });
      const monthAbbr = date.toLocaleString("default", { month: "long" });

      months.push({
        month: monthAbbr,
        monthName: monthName,
        value: monthlyTotals[monthName] ?? null,
      });
      totalTemp += parseFloat(monthlyTotals[monthName] ?? 0);
    }

    setTotalSent(totalTemp);

    setMonethsLabel(months.map((item) => item.month));
    setMonethsvalue(months.map((item) => item.value));
  };
  const barData = {
    labels: monethsLabel,
    datasets: [
      {
        label: "Sent",
        data: monethsValue,
        backgroundColor: "rgba(123, 97, 255, 0.6)",
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value) => value,
        font: {
          weight: "bold",
          size: 12,
        },
        color: "#000",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <main className="content p-5">
      <div>
        <header className="header">
          <h1 className="mb-3">Statistics</h1>
        </header>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className="">
            <h2 className="fw-bold my-3">Total Sent</h2>
            <h3 className="fw-bold my-3">USD {totalSent}</h3>

            <div className="row">
              <div className="col-12">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default StatisticsChart;
