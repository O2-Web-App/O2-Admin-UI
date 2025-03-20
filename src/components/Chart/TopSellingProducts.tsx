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
  // Fetch API data
  const { data: userChart } = useGetChartUserQuery({});
  const apiData = userChart?.data?.top_selling_products || [];

  // Extract product names and sales counts
  const labels = apiData.map((product: any) => product.name);
  const salesData = apiData.map((product: any) => Number(product.sales_count)); // Ensure sales count is a number

  const data = {
    labels, // Y-axis: Product names
    datasets: [
      {
        label: "Sales Count",
        data: salesData, // X-axis: Number of sales
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Bar color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
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
