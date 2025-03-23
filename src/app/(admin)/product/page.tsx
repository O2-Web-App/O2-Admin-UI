import HeaderTable from "@/components/HeaderTable";
import { DataTableProductComponent } from "@/components/product/data-table-products";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function page() {
  return (
    <section className="mx-10">
      {/* header section */}
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
