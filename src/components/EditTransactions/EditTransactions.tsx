import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { useEffect } from 'react';
import { fetchOne, updateTransaction } from '../../store/trackerThunks.ts';
import { TransactionForm } from '../../types';
import { toast } from 'react-toastify';
import TrackerModal from '../UI/TrackerModal/TrackerModal.tsx';
import { closeModal, selectOpen } from '../../store/ModalSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCreateLoading, selectTransaction } from '../../store/transationsSlice.ts';

const EditTransactions = () => {
  const dispatch = useAppDispatch();
  const transaction = useAppSelector(selectTransaction);
  const loading = useAppSelector(selectCreateLoading)
  const open = useAppSelector(selectOpen);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect( () => {
    dispatch(fetchOne(id));
  }, [dispatch, id]);

  const onClose = () => {
    dispatch(closeModal());
  }

  const onSubmit = async (transaction: TransactionForm) => {
    if (id) {
      await dispatch(updateTransaction({id, transaction}));
      toast.success('Dish was edited Successfully!');
      navigate('/admin');
    }
  }

  return (
    <>
      <TrackerModal open={open} onClose={onClose} submitAction={onSubmit} isLoading={loading} transaction={transaction} type='edit'/>
    </>
  );
};

export default EditTransactions;