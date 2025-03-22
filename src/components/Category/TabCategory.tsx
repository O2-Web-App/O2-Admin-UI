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
import { useDeleteCategoryMutation } from "@/redux/service/category";
import { CategoryType } from "@/types/category";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
export default function TabCategory({
  result,
}: {
  result: CategoryType[];
}) {
  // delete category by uuid
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDeleteCategory = async (uuid: string) => {
    const response = await deleteCategory(uuid);
    try {
      if (response.data) {
        toast.success("Category deleted successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed to delete category", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.success("Something went wrong", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });
    }
  };

  return (
    <Tabs defaultValue={result[0]?.name || ""}>
      <TabsList>
        {result?.map((item: CategoryType, index: number) => (
          <TabsTrigger key={index} value={item?.name}>
            {item?.name}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <TiDeleteOutline className="h-5 w-5 text-red-500 ml-5" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure want to delete this category?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the category.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteCategory(item?.uuid)}
                    className="text-white"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
