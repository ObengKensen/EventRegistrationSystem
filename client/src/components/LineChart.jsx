import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement, // Required for points on the line
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Monthly Visitors",
        data: [10, 20, 30, 40, 50],
        borderColor: "#42A5F5",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Monthly Customers",
        data: [15, 25, 35, 45, 55],
        borderColor: "#66BB6A",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "300px" }}>
        <Line data={data} options={options} />
      </div>
  );
};

export default LineChart;
