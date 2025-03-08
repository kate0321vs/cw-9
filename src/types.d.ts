export interface Category {
  type: string;
  name: string;
  id?: string;
}

export interface ApiCategories {
  [key: string]: Category[];
}

export interface TransactionForm {
  category: string;
  amount: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
}

export interface TransactionsListApi {
  [id: string]: TransactionForm;
}