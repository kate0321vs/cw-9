import { Transaction, TransactionForm } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { createTransaction, fetchOne, fetchTransactions } from './trackerThunks.ts';
import { RootState } from '../app/store.ts';


interface categoriesState {
  transactions: Transaction[];
  transactionsLoading: boolean;
  transaction: TransactionForm | null;
  createLoading: boolean;
  fetchLoading: boolean;
}

const initialState: categoriesState = {
  transactions: [],
  transactionsLoading: false,
  transaction: null,
  createLoading: false,
  fetchLoading: false,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, {payload: transactions}) => {
      state.fetchLoading = false;
      state.transactions = transactions;
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOne.pending, (state) => {
      state.transactionsLoading = true;
    });
    builder.addCase(fetchOne.fulfilled, (state, {payload: transaction}) => {
      state.transactionsLoading = false;
      state.transaction = transaction
    });
    builder.addCase(fetchOne.rejected, (state) => {
      state.transactionsLoading = false;
    });

    builder.addCase(createTransaction.pending, (state) => {
      state.createLoading = true
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.createLoading = false
    });
    builder.addCase(createTransaction.rejected, (state) => {
      state.createLoading = false
    });
  }
});

export const selectTransaction = (state: RootState) => state.transactions.transaction
export const selectCreateLoading = (state:RootState) => state.transactions.createLoading;
export const transactionsReducer = transactionsSlice.reducer