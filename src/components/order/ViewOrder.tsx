"use client";
import { useGetOrderDetailByUuidQuery } from "@/redux/service/order";
import { CiBarcode, CiDeliveryTruck } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { GoHome } from "react-icons/go";
import { IoEarthOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import Image from "next/image";
export default function ViewOrder({ uuid }: { uuid: string }) {
  const { data: orderData } = useGetOrderDetailByUuidQuery({
    uuid: uuid,
  });



  const result = orderData?.data;

  const imageBaseUrl =
    process.env.NEXT_PUBLIC_O2_API_URL || "/place-holder-product.jpg";

  return (
    <div className="w-full space-y-5  overflow-y-auto ">
      {/* order code */}
      <div className="flex items-center">
        {/* icon and title */}
        <p className="flex items-center text-description text-[14px] justify-center mr-3">
          <span className=" mr-2">
            {" "}
            <CiBarcode className="h-6 w-6" />
          </span>
          Order Code{" : "}
        </p>
        <p className="text-[14px]">{result?.order_code}</p>
      </div>

      {/* delivery_fee */}
      <div className="flex items-center">
        {/* icon and title */}
        <p className="flex items-center text-description text-[14px] justify-center mr-3">
          <span className=" mr-2">
            {" "}
            <CiDeliveryTruck className="h-6 w-6" />
          </span>
          Delivery Fee{" : "}
        </p>
        <p className="text-[14px]">{result?.delivery_fee}</p>
      </div>

      {/* total_price */}
      <div className="flex items-center">
        {/* icon and title */}
        <p className="flex items-center text-description text-[14px] justify-center mr-3">
          <span className=" mr-2">
            {" "}
            <MdOutlinePriceChange className="h-6 w-6" />
          </span>
          Total Price{" : "}
        </p>
        <p className="text-[14px]">{result?.total_price}$</p>
      </div>

      {/* delivery_method */}
      <div className="flex items-center">
        {/* icon and title */}
        <p className="flex items-center text-description text-[14px] justify-center mr-3">
          <span className=" mr-2">
            {" "}
            <CiDeliveryTruck className="h-6 w-6" />
          </span>
          Delivery Method{" : "}
        </p>
        <p className="text-[14px]">{result?.delivery_method}</p>
      </div>

      {/* delivery_date */}
      <div className="flex items-center">
        {/* icon and title */}
        <p className="flex items-center text-description text-[14px] justify-center mr-3">
          <span className=" mr-2">
            {" "}
            <CiCalendarDate className="h-6 w-6" />
          </span>
          Delivery Date{" : "}
        </p>
        <p className="text-[14px]">
          {result?.delivery_date.match(/^\d{4}-\d{2}-\d{2}/)?.[0] || ""}
        </p>
      </div>

      {/* coupon */}
      <div className="flex items-center">
        {/* icon and title */}
        <p className="flex items-center text-description text-[14px] justify-center mr-3">
          <span className=" mr-2">
            {" "}
            <CiCalendarDate className="h-6 w-6" />
          </span>
          Coupon{" : "}
        </p>
        {result?.coupon === null ? (
          <p className="text-[14px]">N/A</p>
        ) : (
          <p className="text-[14px]">
            {result?.coupon?.code} and {result?.coupon?.discount_percentage}%
          </p>
        )}
      </div>
      <hr />
      {/* order detail */}
      {result?.order_details === null ? (
        <p></p>
      ) : (
        <Accordion type="single" collapsible className="!p-0 !m-0">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-description">
              Order Detail
            </AccordionTrigger>
            <AccordionContent className="space-y-5">
              {/* email */}
              <div className="flex items-center">
                {/* icon and title */}
                <p className="flex items-center text-description text-[14px] justify-center mr-3">
                  <span className=" mr-2">
                    {" "}
                    <MdOutlineEmail className="h-6 w-6" />
                  </span>
                  Email{" : "}
                </p>
                <p className="text-[14px]">{result?.order_details?.email}</p>
              </div>

              {/* phone_number */}
              <div className="flex items-center">
                {/* icon and title */}
                <p className="flex items-center text-description text-[14px] justify-center mr-3">
                  <span className=" mr-2">
                    {" "}
                    <MdOutlineLocalPhone className="h-6 w-6" />
                  </span>
                  Phone Number{" : "}
                </p>
                <p className="text-[14px]">
                  {result?.order_details?.phone_number}
                </p>
              </div>

              {/* province */}
              <div className="flex items-center">
                {/* icon and title */}
                <p className="flex items-center text-description text-[14px] justify-center mr-3">
                  <span className=" mr-2">
                    {" "}
                    <GoHome className="h-6 w-6" />
                  </span>
                  Province{" : "}
                </p>
                <p className="text-[14px]">{result?.order_details?.province}</p>
              </div>

              <div className="flex items-center">  
  {/* icon and title */}  
  <p className="flex items-center text-description text-[14px] justify-center mr-3">  
    <span className="mr-2">  
      <IoEarthOutline className="h-6 w-6" />  
    </span>  
    Google Map Link:  
  </p>  
  <p className="text-[14px] w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">  
    {result?.order_details?.google_map_link}  
  </p>  
</div>  

              {/* remarks */}
              <div className="flex items-center">
                {/* icon and title */}
                <p className="flex items-center text-description text-[14px] justify-center mr-3">
                  <span className=" mr-2">
                    {" "}
                    <MdEditNote className="h-6 w-6" />
                  </span>
                  Remarks{" : "}
                </p>
                <p className="text-[14px]">{result?.order_details?.remarks}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      {/* items detail */}
      {result?.items.length === 0 ? (
        <p></p>
      ) : (
        <Accordion type="single" collapsible className="!p-0 !m-0 max-h-60 overflow-y-auto  scrollbar-hide">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-description">
              Items Detail
            </AccordionTrigger>
            <AccordionContent className="space-y-5">
              {result?.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 border rounded-lg p-4 mb-4 shadow-sm bg-white"
                >
                  {/* Image */}
                  <div className="w-[150px] h-[150px]  flex-shrink-0">
                    <Image
                      src={imageBaseUrl + item?.image}
                      alt={item?.product_name}
                      width={150}
                      height={100}
                      className="object-cover rounded-md w-full h-full"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <p className="font-semibold text-lg text-gray-800 mb-1">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm">
                      <p className="text-gray-500 line-through">
                        Original: ${item.original_price}
                      </p>
                      <p className="text-red-600 font-medium">
                        Discounted: ${item.discounted_price}
                      </p>
                      <p className="text-green-600 font-semibold">
                        Total: ${item.total_price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
