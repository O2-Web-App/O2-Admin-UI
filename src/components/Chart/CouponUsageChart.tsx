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
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };

  // Fetch coupon usage data from API
  const { data: userChart } = useGetChartUserQuery({});
  const apiData = userChart?.data?.coupon_usage || [];

  // Extract coupon codes and usage counts
  const couponCodes = apiData.map((entry: any) => entry.code);
  const usageCounts = apiData.map((entry: any) => entry.usage_count);

  // Generate random colors based on number of coupons
  const backgroundColors = usageCounts.map(() => getRandomColor());

  // Define the chart data
  const data = {
    labels: couponCodes, // X-axis: Coupon codes
    datasets: [
      {
        label: "Coupon Usage",
        data: usageCounts, // Y-axis: Usage count per coupon
        borderColor: backgroundColors, // Line color
        backgroundColor: backgroundColors, // Fill area below line
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
