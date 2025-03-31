export type OrderType = {
  uuid?: string;
  order_code: string;
  total_price: string;
  status: string;
  delivery_date: string;
  created_at: string;
};

export type OrderDetialsType = {
  order_code: string;
  delivery_fee: string;
  total_price: string;
  status: string;
  delivery_method: string;
  delivery_date: string;
  created_at: string;
  coupon: {
    code: string;
    discount_percentage: string;
  };
  order_details: null;
  items: [];
};
