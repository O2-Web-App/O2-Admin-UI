"use client";
import { useGetChartCountQuery } from "@/redux/service/charts";
import React from "react";

export default function CardChartCount() {
  const { data: chartCount } = useGetChartCountQuery({});

  const result = chartCount?.data;

  console.log(result, "data chart count");

  return <div>CardChartCount</div>;
}
