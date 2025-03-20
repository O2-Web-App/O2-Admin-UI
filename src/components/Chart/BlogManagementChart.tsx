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

const BlogManagementChart = () => {
  // Fetch user engagement data from API
  const { data: userChart } = useGetChartUserQuery({});
  const apiData = userChart?.data?.user_engagement || [];

  // Define month mapping for better readability
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

  // Extract dates and engagement counts
  const engagementDates = apiData.map((entry: any) => {
    const [year, month] = entry.date.split("-");
    return `${monthMap[month]} ${year}`; // Converts "2025-02" → "February 2025"
  });

  const engagementCounts = apiData.map((entry: any) => entry.engagement_count);

  // Define the chart data
  const data = {
    labels: engagementDates, // X-axis: Dates formatted as "February 2025"
    datasets: [
      {
        label: "User Engagement",
        data: engagementCounts, // Y-axis: Engagement count
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
        text: "User Engagement Over Time",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide grid lines for better visibility
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Adjust based on engagement range
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

export default BlogManagementChart;
