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

// Register necessary Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BlogManagementChart = () => {
  // Fetch user engagement data
  const { data: userChart } = useGetChartUserQuery({});
  const apiData = userChart?.data?.user_engagement || [];

  // Define month mapping
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

  // Convert API data into a map { "2025-03": 3 }
  const engagementMap = apiData.reduce(
    (
      acc: Record<string, number>,
      entry: { date: string; engagement_count: number }
    ) => {
      acc[entry.date] = entry.engagement_count;
      return acc;
    },
    {}
  );

  // Generate labels (month names) and ensure all months are represented
  const labels = allMonths.map((date) => {
    const [, month] = date.split("-");
    return monthMap[month]; // Converts "2025-03" → "March"
  });

  // Generate engagement count values for each month (defaulting to 0 if missing)
  const engagementCounts = allMonths.map((month) => engagementMap[month] || 0);

  // Define the chart data
  const data = {
    labels, // X-axis: Month names
    datasets: [
      {
        label: "Blog Engagement",
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
    <div className="h-[500px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default BlogManagementChart;
