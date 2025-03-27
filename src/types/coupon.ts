export type CouponType = {
  uuid?: string;
  code: string;
  max_usage: number;
  user_limit: number;
  discount_percentage: number;
  start_date: string;
  end_date: string;
  is_active?: number;
};
