import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { useEffect } from 'react';
import { createTransaction, fetchCategories } from '../../store/trackerThunks.ts';
import TrackerModal from '../UI/TrackerModal/TrackerModal.tsx';
import { closeModal, selectOpen } from '../../store/ModalSlice.ts';
import { selectCategories } from '../../store/categoriesSlice.ts';
import { TransactionForm } from '../../types';
import { selectCreateLoading } from '../../store/transationsSlice.ts';

const NewTransactions = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOpen);
  const loading = useAppSelector(selectCreateLoading)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch]);

  const onClose = () => {
    dispatch(closeModal());
  }

  const submitAction = async (transaction: TransactionForm) => {
   await dispatch(createTransaction(transaction));
   dispatch(closeModal());
  }

  return (
    <div>
       <TrackerModal open={open} onClose={onClose} submitAction={submitAction} isLoading={loading} />
    </div>
  );
};

export default NewTransactions;