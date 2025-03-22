export type ProductType = {
  uuid: string;
  category_name: string;
  name: string;
  description: string;
  price: string; // Assuming price is a string, but it could be a number too.
  discount_percentage: string; // Same as above, could be a number.
  discounted_price: number;
  stock: number;
  is_preorder: boolean;
  single_image: string;
  multi_images: string[];
  color: string;
  size: string;
  average_rating: number;
  created_at: string | null; // Could be null if not set
  updated_at: string | null; // Could be null if not set
};
