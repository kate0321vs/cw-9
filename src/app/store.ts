import {configureStore} from "@reduxjs/toolkit";
import { categoriesReducer } from '../store/categoriesSlice.ts';
import { modalReducer } from '../store/ModalSlice.ts';
import { transactionsReducer } from '../store/transationsSlice.ts';

export const store = configureStore( {
    reducer: {
      categories: categoriesReducer,
      modal: modalReducer,
      transactions: transactionsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;