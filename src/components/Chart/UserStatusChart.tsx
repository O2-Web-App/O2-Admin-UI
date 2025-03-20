"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import { useGetChartUserQuery } from "@/redux/service/charts";

export default function UserStatusChart() {
  const { data: userChart } = useGetChartUserQuery({});
  const activeInactiveData = userChart?.data?.active_vs_inactive || {};

  // Extract values dynamically
  const activeUsers = activeInactiveData.active_users || 0;
  const inactiveUsers = activeInactiveData.inactive_users || 0;

  const data = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        label: "User Status",
        data: [activeUsers, inactiveUsers], // Use API data
        backgroundColor: ["#4CAF50", "#FF9800"], // Green for Active, Orange for Inactive
        borderColor: ["#4CAF50", "#FF9800"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "User Status Distribution",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="h-[300px] w-[400px] flex justify-center items-center">
      <Pie data={data} options={options} />
    </div>
  );
}
