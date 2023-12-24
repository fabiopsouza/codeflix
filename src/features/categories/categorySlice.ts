import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  description: null | string;
}

const category = {
  id: '112323edsdsdsas',
  name: 'Nome da categoria',
  is_active: true,
  created_at: '2021-11-11 11:11:11',
  updated_at: '2021-11-12 11:11:11',
  deleted_at: null,
  description: 'Descrição da categoria',
}

export const initialState = [category]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory: (state, action) => {},
    updateCategory: (state, action) => {},
    deleteCategory: (state, action) => {}
  }
})

// Selectors
export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);
  return category || {} as Category;
};

export default categoriesSlice.reducer;

