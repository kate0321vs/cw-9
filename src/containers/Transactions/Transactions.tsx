import NewTransactions from '../../components/NewTransactions/NewTransactions.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import TransactionItem from './TransactionItem/TransactionItem.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { selectFetchLoading, selectTransactions } from '../../store/transationsSlice.ts';
import { selectCategories } from '../../store/categoriesSlice.ts';
import { fetchCategories, fetchTransactions } from '../../store/trackerThunks.ts';
import { Container } from '@mui/material';
import { useEffect } from 'react';

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log(categories, 'Transactions');

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : transactions.length !== 0 ? (
        transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} categories={categories} />
        ))
      ) : (
        <p style={{ marginTop: 30 }}>No transactions yet</p>
      )}
      <NewTransactions />
    </Container>
  );
};

export default Transactions;
