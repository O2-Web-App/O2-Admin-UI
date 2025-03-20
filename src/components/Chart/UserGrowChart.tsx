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

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

import { useGetChartUserQuery } from "@/redux/service/charts";

const UserGrowthChart = () => {
  // get user data
  const { data: userChart } = useGetChartUserQuery({});
  const apiData = userChart?.data?.user_growth || [];
  // Define months with both number & name
  const monthMap: Record<string, string> = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };

  // List of all months in a year
  const allMonths = Object.keys(monthMap).map((num) => `2025-${num}`);

  // Convert API data into an object { "2025-01": 5, "2025-02": 8, ... }
  const userGrowthMap = apiData.reduce(
    (acc: Record<string, number>, entry: { date: string; count: number }) => {
      acc[entry.date] = entry.count;
      return acc;
    },
    {}
  );

  // Generate labels (month names) and ensure all months exist
  const labels = allMonths.map((date) => monthMap[date.split("-")[1]]); // Convert to "January", "February", etc.
  const counts = allMonths.map((month) => userGrowthMap[month] || 0); // Fill missing months with 0

  const data = {
    labels, // X-axis: Month names
    datasets: [
      {
        label: "User Growth",
        data: counts, // Y-axis: User counts per month
        borderColor: "rgba(85, 159, 52, 1)", // Line color
        backgroundColor: "rgba(85, 159, 52, 0.2)", // Fill area below line
        borderWidth: 2,
        pointRadius: 5, // Point size
        pointBackgroundColor: "rgba(85, 159, 52, 1)", // Point color
        tension: 0.3, // Curves the line
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
        text: "User Growth by Month",
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
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="h-[500px] w-[60%]">
      <Line data={data} options={options} />
    </div>
  );
};

export default UserGrowthChart;
