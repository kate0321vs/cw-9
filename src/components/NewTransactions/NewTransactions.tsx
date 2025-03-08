import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { useEffect } from 'react';
import { createTransaction, fetchCategories, fetchTransactions } from '../../store/trackerThunks.ts';
import TrackerModal from '../UI/TrackerModal/TrackerModal.tsx';
import { closeModal, selectOpen } from '../../store/ModalSlice.ts';
import { selectCategories } from '../../store/categoriesSlice.ts';
import { TransactionForm } from '../../types';
import { selectCreateLoading } from '../../store/transationsSlice.ts';
import { toast } from 'react-toastify';

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
    toast.success('Contact was added Successfully!');
   dispatch(closeModal());
   await dispatch(fetchTransactions());
  }

  return (
    <div>
       <TrackerModal open={open} onClose={onClose} submitAction={submitAction} isLoading={loading}/>
    </div>
  );
};

export default NewTransactions;