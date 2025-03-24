"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryNameByUuidMutation,
} from "@/redux/service/category";
import { CategoryType, Subcategory } from "@/types/category";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { DataTableCategoryComponent } from "./data-table-category";
export default function TabCategory() {
  // state hold user input
  const [categoryName, setCategoryName] = useState("");

  const [activeTab, setActiveTab] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // get all categories
  const { data } = useGetAllCategoriesQuery({});

  const result = data?.data || [];

  useEffect(() => {
    if (result.length > 0) {
      setActiveTab(result[0].name);
    }
  }, [result]);

  // export to excel
  const exportToExcel = () => {
    // Assume `result` is your array of categories
    const categoriesSheet = result.map((cat: CategoryType) => ({
      UUID: cat.uuid,
      Name: cat.name,
      CreatedAt: cat.created_at,
      UpdatedAt: cat.updated_at,
    }));

    // Flatten subcategories with parent info
    const subcategoriesSheet = result.flatMap((cat: CategoryType) =>
      cat.subcategories.map((sub: Subcategory) => ({
        SubcategoryUUID: sub.uuid,
        SubcategoryName: sub.name,
        ParentCategory: cat.name,
        CreatedAt: sub.created_at,
        UpdatedAt: sub.updated_at,
      }))
    );

    const wb = XLSX.utils.book_new();

    const wsCategories = XLSX.utils.json_to_sheet(categoriesSheet);
    const wsSubcategories = XLSX.utils.json_to_sheet(subcategoriesSheet);

    XLSX.utils.book_append_sheet(wb, wsCategories, "Categories");
    XLSX.utils.book_append_sheet(wb, wsSubcategories, "Subcategories");

    XLSX.writeFile(wb, "Categories.xlsx");
  };

  // delete category by uuid
  const [deleteCategory] = useDeleteCategoryMutation();

  // create category
  const [createCategory] = useCreateCategoryMutation();

  const handleCreateCategory = async () => {
    if (categoryName.trim() === "")
      toast.error("Category is Require", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });

    try {
      const response = await createCategory({ name: categoryName });
      if (response.data) {
        toast.success("Category create successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed to create category", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("Something went wrong ", {
        style: {
          background: "#bb2124",
        },
      });
    }

    setCategoryName(""); // Clear input after action
  };

  // update category by uuid
  const [updateCategory] = useUpdateCategoryNameByUuidMutation();

  const handleDeleteCategory = async (uuid: string) => {
    try {
      const response = await deleteCategory(uuid);
      if (response.data) {
        toast.success("Category Deleted Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Delete Category", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.success("Something Went Wrong", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });
    }
  };

  const handleUpdateCategoryName = async (uuid: string) => {
    try {
      const response = await updateCategory({ name: categoryName, uuid: uuid });
      if (response.data) {
        toast.success("Category Name Updated Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
        setCategoryName("");
      } else {
        toast.error("Failed To Update Category Name", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.success("Something Went Wrong", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between ">
        <h1 className="text-title-color ml-10 text-lg md:text-2xl xl:text-4xl font-bold dark:text-secondary-color-text mb-1 md:mb-2">
          CATEGORY MANAGEMENT
        </h1>

        <div className="space-x-5 mr-10">
          {/* create Category */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="rounded-[6px] bg-primary text-white px-4 w-auto">
                Create Category
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create Product Category</AlertDialogTitle>
              </AlertDialogHeader>

              {/* 🧾 Input form */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category Name
                </label>
                <Input
                  id="category"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="h-[45px]"
                />
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="text-white bg-primary"
                  onClick={handleCreateCategory}
                >
                  Create
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* export pdf */}
          <Button
            onClick={exportToExcel}
            className=" rounded-[6px] bg-accent hover:bg-accent text-white px-4 w-auto"
          >
            Export Excel
          </Button>
        </div>
      </div>
      {result?.length > 0 ? (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="ml-8 my-5"
        >
          <TabsList>
            {result?.map((item: CategoryType, index: number) => (
              <TabsTrigger key={index} value={item?.name}>
                {item?.name}
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="pl-5"
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      <div className="bg-accent text-white text-sm px-3 py-1 rounded-md  transition ">
                        Action
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col space-y-4 w-[100px] p-3">
                    {/* update category by name */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="text-white bg-primary rounded-[6px] py-1 px-4 w-auto">
                          Update
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Update Product Category Name
                          </AlertDialogTitle>
                        </AlertDialogHeader>

                        {/* 🧾 Input form */}
                        <div className="flex flex-col space-y-2">
                          <label
                            htmlFor="category"
                            className="text-sm font-medium"
                          >
                            Category Name
                          </label>
                          <Input
                            id="category"
                            placeholder="Enter category name to update"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="h-[45px]"
                          />
                        </div>

                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setCategoryName("")}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="text-white bg-primary"
                            onClick={() => handleUpdateCategoryName(item.uuid)}
                          >
                            confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* delete product */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div className="bg-red-500 text-white px-3 py-2 rounded transition hover:bg-red-500">
                          Delete
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure want to delete {item.name} category?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the category.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCategory(item?.uuid)}
                            className="text-white"
                          >
                            Yes
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </PopoverContent>
                </Popover>
              </TabsTrigger>
            ))}
          </TabsList>

          {result?.map((item: CategoryType, index: number) => (
            <TabsContent key={index} value={item?.name}>
              <DataTableCategoryComponent uuid={item.uuid} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className=" h-screen flex justify-center items-center   w-full">
          <p>No Data</p>
        </div>
      )}
    </div>
  );
}
