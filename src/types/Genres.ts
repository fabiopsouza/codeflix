import { Category } from "./Category";

export interface Results {
  current_page: number;
  per_page: number;
  total: number;
  items: Genre[];
}

export interface Genre {
  id: string;
  name: string;
  isActive: boolean;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  categories?: Category[];
  description?: null | string;
  pivot?: Pivot;
}

export interface Pivot {
  genre_id: string;
  category_id: string;
}

export interface GenreParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

export interface GenrePayload {
  id: string;
  name: string;
  categories_id?: string[];
}
