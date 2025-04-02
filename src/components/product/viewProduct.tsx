"use client"; // Indicate client-side component

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGetProductByUuidQuery } from "@/redux/service/product";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";

interface ProductFeedback {
  uuid: string;
  user: {
    uuid: string;
    name: string;
    avatar: string;
  };
  comment: string;
  rating: number;
  created_at: string;
}

interface ProductType {
  uuid?: string;
  name: string;
  description: string;
  category_name: string;
  price: number;
  stock: number;
  images?: string[];
  average_rating?: number;
  feedbacks?: ProductFeedback[];
  created_at: string;
  updated_at: string;
}

export default function ProductView({ productUuid }: { productUuid: string }) {


  // get product detail
  const { data: result , isLoading} = useGetProductByUuidQuery({ uuid: productUuid });

  const product = result?.data;

  const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL || "";

  const renderImageFallback = () => (
    <div className="col-span-2 md:col-span-3 text-center py-4 text-gray-500">
      No images available
    </div>
  );

  return (
    <AlertDialogContent className="h-[90%] overflow-y-auto !bg-white scrollbar-hide">
      <AlertDialogTitle>
        <p className="text-[30px] mb-5 text-accent font-medium">
          Product Details
        </p>
        <hr />
      </AlertDialogTitle>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
          <p>Loading product data...</p>
        </div>
      ) : product ? (
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex space-x-24 items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Category name
                </h3>
                <p className="text-base">{product.category_name || "N/A"}</p>
              </div>
              <div className="text-base flex flex-col items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Created/ Updated
                  </h3>
                  <p className="text-base">
                    {product.created_at || "N/A"}/ {product.updated_at || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              {/* <h3 className="text-lg font-semibold mb-2">Images</h3>   */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product &&
                Array.isArray(product.images) &&
                product.images.length > 0
                  ? product.images.map((image: any, index: number) => (
                      <div
                        key={index}
                        className="relative bg-gray-100 rounded-md border overflow-hidden"
                      >
                        <img
                          src={
                            image ? imageBaseUrl + image : "/placeholder.svg"
                          }
                          alt={`Product image ${index + 1}`}
                          className="w-full h-40 object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/placeholder.svg?height=160&width=160";
                          }}
                        />
                      </div>
                    ))
                  : renderImageFallback()}
              </div>
            </div>
            <div className="text-base flex items-center">
              {product.average_rating !== undefined &&
              product.average_rating !== null ? (
                Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className="text-yellow-500">
                    {
                      index < Math.floor(product.average_rating!)
                        ? "★" // Full star
                        : "☆" // Empty star
                    }
                  </span>
                ))
              ) : (
                <p className="text-gray-500">N/A</p>
              )}
            </div>
            <div className="space-x-4">
              <button className="text-base text-white bg-red-500 rounded px-4 py-2 transition ">
                {" "}
                Price:
                {product.price ? ` ${product.price}$` : "N/A"}
              </button>
              <button className="text-base text-white bg-primary rounded px-4 py-2 transition ">
                {" "}
                Stock:
                {product.stock ? ` ${product.stock}` : "N/A"}
              </button>
            </div>
            <div>
              <p className="text-lg font-semibold">
                {product.name || "No name provided"}
              </p>
              <p className="text-base">
                {product.description || "No description available"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No product data available
        </div>
      )}
      <AlertDialogCancel className="w-full bg-accent text-white">
        Close
      </AlertDialogCancel>
    </AlertDialogContent>
  );
}
