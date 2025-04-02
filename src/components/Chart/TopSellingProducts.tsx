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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopSellingProducts = () => {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };

  // Fetch API data
  const { data: userChart } = useGetChartUserQuery({});
  const apiData = userChart?.data?.top_selling_products || [];

  // Extract product names and sales counts
  const labels = apiData.map((product: any) => product.name);
  const salesData = apiData.map((product: any) => Number(product.sales_count)); // Ensure sales count is a number
  const backgroundColors = salesData.map(() => getRandomColor());
  const data = {
    labels, // Y-axis: Product names
    datasets: [
      {
        label: "Sales Count",
        data: salesData, // X-axis: Number of sales
        borderColor: backgroundColors, // Line color
        backgroundColor: backgroundColors, // Fill area below line
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
    indexAxis: "y" as const, // Horizontal bar chart
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: "Top Selling Products",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Adjust for integer values
        },
      },
    },
  };

  return (
    <div className="h-[500px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopSellingProducts;
