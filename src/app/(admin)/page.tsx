import BlogManagementChart from "@/components/Chart/BlogManagementChart";
import CardChartCount from "@/components/Chart/CardChartCount/CardChartCount";
import CouponUsageChart from "@/components/Chart/CouponUsageChart";
import OrderChart from "@/components/Chart/OrderChart";
import RevenueTrend from "@/components/Chart/RevenueTrend";
import TopSellingProducts from "@/components/Chart/TopSellingProducts";
import UserGrowthChart from "@/components/Chart/UserGrowChart";
import UserStatusChart from "@/components/Chart/UserStatusChart";

export default function Home() {
  return (
    <section>
      <div>
        <CardChartCount />
      </div>
      <div className="h-full w-full flex justify-center items-center">
        <UserGrowthChart />
        <UserStatusChart />
      </div>
      <div className="my-[60px] w-[90%] mx-auto">
        <OrderChart />
      </div>
      <div className="my-[60px] w-[90%] mx-auto">
        <RevenueTrend />
      </div>
      <div className="my-[60px] w-[90%] mx-auto">
        <TopSellingProducts />
      </div>
      <div className="my-[60px] w-[90%] mx-auto">
        <CouponUsageChart />
      </div>
      <div className="my-[60px] w-[90%] mx-auto">
        <BlogManagementChart />
      </div>
    </section>
  );
}
