export type ProductType = {
  uuid?: string;
  name: string;
  description: string;
  category_uuid: string;
  subcategory_uuid: string;
  discount_uuid: string;
  discount_percentage?: number;
  discounted_price?: number;
  price: number;
  stock: number;
  is_preorder: boolean;
  preorder_duration: number | null;
  is_recommended: boolean;
  single_image?: string;
  expiration_date: string; // ISO date string, e.g., "2025-06-01"
  multi_images: File[]; // Array of image URLs (as strings)
};
