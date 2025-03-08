import { Category } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchOneCategory } from './trackerThunks.ts';
import { RootState } from '../app/store.ts';

interface categoriesState {
   categories: Category[];
   category: Category | null;
   categoriesLoading: boolean;
   categoryLoading: boolean
}

const initialState: categoriesState = {
  categories: [],
  category: null,
  categoriesLoading: false,
  categoryLoading: false,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
     builder.addCase(fetchCategories.pending, (state) => {
       state.categoriesLoading = true;
     });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.categoriesLoading = false;
      state.categories = categories
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categoriesLoading = false;
    });

    builder.addCase(fetchOneCategory.pending, (state) => {
      state.categoryLoading = true;
    });
    builder.addCase(fetchOneCategory.fulfilled, (state, {payload: category}) => {
      state.categoryLoading = false;
      state.category = category
    });
    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.categoryLoading = false;
    });
  }
});

export const selectCategories = (state:RootState) => state.categories.categories;
export const selectCategory = (state:RootState) => state.categories.category;
export const categoriesReducer = categoriesSlice.reducer