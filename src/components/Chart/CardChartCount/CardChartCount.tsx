"use client";  
import { useGetChartCountQuery } from "@/redux/service/charts";  
import React from "react";  


export default function CardChartCount() {  
  const { data: chartCount } = useGetChartCountQuery({});  
  const result = chartCount?.data;  

  const total_products = result?.total_products || 0;  
  const total_orders = result?.total_orders || 0;  
  const total_payment = result?.total_payment || 0;  
  const active_users = result?.active_users || 0;  

  return (  
    <div className="grid grid-cols-4 gap-4 text-gray-900">  
      <div className="bg-white p-4 rounded-lg border" style={{ borderColor: 'rgba(85, 159, 52, 1)' }}>  
        <h2 className="text-2xl text-orange-600">${total_payment.toFixed(2)}</h2>  
        <p className="text-sm text-orange-500 mb-2">+20.1% from last month</p>  
        <span className="text-gray-500 text-md font-bold">Total Payment</span>  
      </div>  
      <div className="bg-white p-4 rounded-lg border" style={{ borderColor: 'rgba(85, 159, 52, 1)' }}>  
        <h2 className="text-2xl text-blue-600">{total_products}</h2>  
        <p className="text-sm text-blue-500 mb-2">+180.1% from last month</p>  
        <span className="text-gray-500 text-md font-bold">Total Products</span>  
      </div>  
      <div className="bg-white p-4 rounded-lg border" style={{ borderColor: 'rgba(85, 159, 52, 1)' }}>  
        <h2 className="text-2xl text-yellow-600">{total_orders}</h2>  
        <p className="text-sm text-yellow-500 mb-2">+19% from last month</p>  
        <span className="text-gray-500 text-md font-bold">Total Orders</span>  
      </div>  
      <div className="bg-white p-4 rounded-lg border" style={{ borderColor: 'rgba(85, 159, 52, 1)' }}>  
        <h2 className="text-2xl text-green-600">{active_users}</h2>  
        <p className="text-sm text-green-500 mb-2">+201 since last hour</p>  
        <span className="text-gray-500 text-md font-bold">Active User</span>  
      </div>  
    </div>  
  );  
}  