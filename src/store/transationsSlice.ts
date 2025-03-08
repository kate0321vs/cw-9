import { Transaction, TransactionForm } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createTransaction,
  deleteTransaction,
  fetchOne,
  fetchTransactions,
  updateTransaction
} from './trackerThunks.ts';
import { RootState } from '../app/store.ts';


interface transactionsState {
  transactions: Transaction[];
  transactionLoading: boolean;
  transaction: TransactionForm | null;
  createLoading: boolean;
  fetchLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean | string;
}

const initialState: transactionsState = {
  transactions: [],
  transactionLoading: false,
  transaction: null,
  createLoading: false,
  fetchLoading: false,
  updateLoading: false,
  deleteLoading: false,
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
      state.transactionLoading = true;
    });
    builder.addCase(fetchOne.fulfilled, (state, {payload: transaction}) => {
      state.transactionLoading = false;
      state.transaction = transaction
    });
    builder.addCase(fetchOne.rejected, (state) => {
      state.transactionLoading = false;
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

    builder.addCase(updateTransaction.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateTransaction.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateTransaction.rejected, (state) => {
      state.updateLoading = false;
    });

    builder.addCase(deleteTransaction.pending, (state, action) => {
      state.deleteLoading = action.meta.arg
    });
    builder.addCase(deleteTransaction.fulfilled, (state) => {
      state.deleteLoading = false
    });
    builder.addCase(deleteTransaction.rejected, (state) => {
      state.deleteLoading = false
    });
  }
});

export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectFetchLoading = (state: RootState) => state.transactions.fetchLoading;
export const selectTransaction = (state: RootState) => state.transactions.transaction
export const selectCreateLoading = (state:RootState) => state.transactions.createLoading;
export const selectDeleteLoading = (state: RootState) => state.transactions.deleteLoading;
export const transactionsReducer = transactionsSlice.reducer