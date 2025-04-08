import { AppSidebar } from "@/components/app-sidebar";
import BlogManagementChart from "@/components/Chart/BlogManagementChart";
import CardChartCount from "@/components/Chart/CardChartCount/CardChartCount";
import CouponUsageChart from "@/components/Chart/CouponUsageChart";
import OrderChart from "@/components/Chart/OrderChart";
import RevenueTrend from "@/components/Chart/RevenueTrend";
import TopSellingProducts from "@/components/Chart/TopSellingProducts";
import UserGrowthChart from "@/components/Chart/UserGrowChart";
import UserStatusChart from "@/components/Chart/UserStatusChart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full ">
        <SidebarInset className="z-40 w-full top-0 sticky">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
        </SidebarInset>
        <section>
          <div className="my-[60px] w-[90%] mx-auto">
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
      </main>
    </SidebarProvider>
  );
}
