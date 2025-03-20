"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetChartUserQuery } from "@/redux/service/charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const RevenueTrend = () => {
  // get user data
  const { data: userChart } = useGetChartUserQuery({});
  const apiData = userChart?.data?.revenue_trends || [];

  // Define months with both number & name
  const monthMap: Record<string, string> = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  // List of all months in a year
  const allMonths = Object.keys(monthMap).map((num) => `2025-${num}`);

  // Convert test data into an object { "2025-01": 5, "2025-02": 8, ... }
  const userGrowthMap = apiData.reduce(
    (
      acc: Record<string, number>,
      entry: { date: string; total_revenue: number }
    ) => {
      acc[entry.date] = entry.total_revenue;
      return acc;
    },
    {}
  );

  // Generate labels (month names) and ensure all months exist
  const labels = allMonths.map((date) => monthMap[date.split("-")[1]]);
  const counts = allMonths.map((month) => userGrowthMap[month] || 0);

  const data = {
    labels, // X-axis: Month names
    datasets: [
      {
        label: "Revenue Trends ",
        data: counts, // Y-axis: total_revenue counts per month
        borderColor: "rgba(85, 159, 52, 1)", // Line color
        backgroundColor: "rgba(85, 159, 52, 0.2)", // Fill area below line
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "rgba(85, 159, 52, 1)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Revenue Trends by Month ",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="h-[500px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueTrend;
