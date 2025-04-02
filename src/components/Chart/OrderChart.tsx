"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetChartUserQuery } from "@/redux/service/charts";

// Register necessary Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrderChart = () => {

  
  // Fetch user order data
  const { data: userChart } = useGetChartUserQuery({});
  const apiData = userChart?.data?.orders_over_time || [];

  // Define months mapping
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

  // Extract unique years dynamically
  const uniqueYears = [
    ...new Set(apiData.map((entry: any) => entry.date.split("-")[0])),
  ];

  // Generate all months for available years
  const allMonths = uniqueYears.flatMap((year) =>
    Object.keys(monthMap).map((month) => `${year}-${month}`)
  );

  // Convert API data into a map { "2025-01": 5, "2025-02": 8, ... }
  const orderCountMap = apiData.reduce(
    (acc: Record<string, number>, entry: { date: string; count: number }) => {
      acc[entry.date] = entry.count;
      return acc;
    },
    {}
  );

  // Generate labels (month names) and ensure all months are represented
  const labels = allMonths.map((date) => {
    const [, month] = date.split("-");
    return monthMap[month]; // Converts "2025-02" → "February"
  });

  // Generate order count values for each month (defaulting to 0 if missing)
  const orderCounts = allMonths.map((month) => orderCountMap[month] || 0);

  // Define the chart data
  const data = {
    labels, // X-axis: Month names
    datasets: [
      {
        label: "Orders Over Time",
        data: orderCounts, // Y-axis: Order count
        borderColor: "rgba(85, 159, 52, 1)", // Line color
        backgroundColor: "rgba(85, 159, 52, 0.2)", // Fill area below line
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "rgba(85, 159, 52, 1)",
        tension: 0.3,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Orders Over Time by Month",
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default OrderChart;
