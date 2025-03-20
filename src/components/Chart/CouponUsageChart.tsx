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

const CouponUsageChart = () => {
  // Fetch coupon usage data from API
  const { data: userChart } = useGetChartUserQuery({});
  const apiData = userChart?.data?.coupon_usage || [];

  // Extract coupon codes and usage counts
  const couponCodes = apiData.map((entry: any) => entry.code);
  const usageCounts = apiData.map((entry: any) => entry.usage_count);

  // Define the chart data
  const data = {
    labels: couponCodes, // X-axis: Coupon codes
    datasets: [
      {
        label: "Coupon Usage",
        data: usageCounts, // Y-axis: Usage count per coupon
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
        text: "Coupon Usage Overview",
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
          stepSize: 10, // Adjust based on coupon usage range
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

export default CouponUsageChart;
