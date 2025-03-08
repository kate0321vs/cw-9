import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import { ApiCategories, Category, Transaction, TransactionForm, TransactionsListApi } from '../types';

export const fetchCategories = createAsyncThunk<Category[], undefined>(
  'categories/fetchCategories',
  async () => {
    const categoriesResponse = await axiosApi<ApiCategories>('/categories.json');
    const categories = categoriesResponse.data;
    console.log(categories);
    let newCategories: Category[] = [];
    if(categories) {
      newCategories = Object.keys(categories).map((key) => {
        return {...categories[key], id: key};
      });
    }
    console.log(newCategories);
    return newCategories;
  }
)

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
    return newTransactions;
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