export type ProductType = {
  name: string;
  description: string;
  category_uuid: string;
  subcategory_uuid: string;
  discount_uuid: string;

  price: number;
  stock: number;
  is_preorder: boolean;
  preorder_duration: number | null;
  expiration_date: string; // ISO date string, e.g., "2025-06-01"
  multi_images: string[]; // Array of image URLs (as strings)
  files: null;
};
