import { Category } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './trackerThunks.ts';
import { RootState } from '../app/store.ts';

interface categoriesState {
   categories: Category[];
   categoriesLoading: boolean;
}

const initialState: categoriesState = {
  categories: [],
  categoriesLoading: false,
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
  }
});

export const selectCategories = (state:RootState) => state.categories.categories;
export const categoriesReducer = categoriesSlice.reducer