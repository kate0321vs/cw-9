import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import { ApiCategories, Category, Transaction, TransactionForm, TransactionsListApi } from '../types';

export const fetchCategories = createAsyncThunk<Category[], undefined>(
  'categories/fetchCategories',
  async () => {
    const categoriesResponse = await axiosApi<ApiCategories>('/categories.json');
    const categories = categoriesResponse.data;
    let newCategories: Category[] = [];
    if(categories) {
      newCategories = Object.keys(categories).map((key) => {
        return {...categories[key], id: key};
      });
    }
    return newCategories;
  }
)

export const fetchOneCategory = createAsyncThunk<Category, string>(
  "transactions/fetchOne",
  async (id) => {
    const categoryResponse = await axiosApi<Category | null>(`/transactions/${id}.json`);
    const category = categoryResponse.data;
    if(!category) {
      throw new Error("Not Found!");
    }
    return category;
  }
);

export const fetchTransactions = createAsyncThunk<Transaction[], undefined>(
  "transactions/fetchAll",
  async () => {
    const transactionsResponse = await axiosApi<TransactionsListApi | null>('/transactions.json')
    const transactions = transactionsResponse.data;
    let newTransactions: Transaction[] = [];
    if(transactions) {
      newTransactions = Object.keys(transactions).map((key) => {
        return {...transactions[key], id: key};
      });
    }
    return newTransactions.reverse();
  }
);

export const fetchOne = createAsyncThunk<TransactionForm, string>(
  "transactions/fetchOne",
  async (id) => {
    const transactionResponse = await axiosApi<TransactionForm | null>(`/transactions/${id}.json`);
    const transaction = transactionResponse.data;
    if(!transaction) {
      throw new Error("Not Found!");
    }
    return transaction;
  }
);

export const createTransaction = createAsyncThunk<void, TransactionForm>(
  "dishes/create",
  async (transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  }
);

export const updateTransaction = createAsyncThunk<void, {id: string, transaction: TransactionForm}>(
  "transactions/update",
  async ({id, transaction}) => {
    await axiosApi.put(`/transactions/${id}.json`, transaction);
  }
);

export const deleteTransaction = createAsyncThunk(
  "dishes/delete",
  async (id: string) => {
    await axiosApi.delete(`/transactions/${id}.json`);
  }
);