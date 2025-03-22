export type Subcategory = {
  uuid: string;
  name: string;
  is_deleted: number;
  created_at: string | null;
  updated_at: string | null;
};

export type CategoryType = {
  uuid: string;
  name: string;
  is_deleted: number;
  created_at: string | null;
  updated_at: string | null;
  subcategories: Subcategory[];
};
