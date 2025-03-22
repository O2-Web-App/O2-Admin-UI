import { DataTableProductComponent } from "@/components/product/data-table-products";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function page() {
  return (
    <section className="m-10">
      {/* header section */}
      <div>
        <div className="flex justify-between items-start sm:items-center gap-4 mb-5">
          <div>
            <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold dark:text-secondary-color-text mb-1 md:mb-2">
              Product MANAGEMENT
            </h1>
            <p className="text-description-color text-sm md:text-base xl:text-lg font-light dark:text-dark-description-color">
              Real-time insights for data-driven decisions
            </p>
          </div>
          <Button
            // onClick={exportToExcel}
            className="text-secondary-color-text rounded-[6px] bg-primary-color hover:bg-primary-color/80 px-4 w-auto"
          >
            Export Excel
          </Button>
        </div>
      </div>
      <Tabs defaultValue="Products">
        <TabsList>
          <TabsTrigger value="Products">Product Table</TabsTrigger>
          <TabsTrigger value="CreateProduct">CreateProduct</TabsTrigger>
        </TabsList>
        <TabsContent value="Products">
          <DataTableProductComponent />
        </TabsContent>
        <TabsContent value="CreateProduct">will be create product</TabsContent>
      </Tabs>
    </section>
  );
}
