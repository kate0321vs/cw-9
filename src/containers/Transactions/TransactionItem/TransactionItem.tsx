import { Box, Card, IconButton, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Transaction, Category } from '../../../types';
import { openEditModal } from '../../../store/ModalSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { selectDeleteLoading } from '../../../store/transationsSlice.ts';
import ButtonSpinner from '../../../components/UI/Spinner/ButtonSpinner/ButtonSpinner.tsx';
import { deleteTransaction, fetchTransactions } from '../../../store/trackerThunks.ts';
import { toast } from 'react-toastify';

interface Props {
  transaction: Transaction;
  categories: Category[];
}

const TransactionItem: React.FC<Props> = ({ transaction, categories }) => {
  const dispatch = useAppDispatch();
 const deleteLoading = useAppSelector(selectDeleteLoading);

 const onDelete = async () => {
   if (window.confirm("Are you sure you want to delete this transaction?")) {
     await dispatch(deleteTransaction(transaction.id));
     toast.success('Transaction was deleted Successfully!');
     await dispatch(fetchTransactions());
   }
 }

  const category = categories.find((cat) => cat.id === transaction.category);

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: 2, boxShadow: 2, mb:3 }}>
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <Typography sx={{ minWidth: 140, fontWeight: "bold" }}>
          {new Date(transaction.createdAt).toLocaleString()}
        </Typography>
        <Typography sx={{ flexGrow: 1, ml: 2 }}>
          {category ? category.name : "Загрузка..."}
        </Typography>
        <Typography sx={{ color: "green", fontWeight: "bold" }}>
          {transaction.amount} KGS
        </Typography>
      </Box>
      <IconButton title="Редактировать" onClick={() => dispatch(openEditModal())}>
        <ModeEditIcon />
      </IconButton>
      <IconButton title="удалить" onClick={onDelete}>
        {deleteLoading && deleteLoading === transaction.id && <ButtonSpinner/>} {!deleteLoading && <DeleteIcon />}
      </IconButton>
    </Card>
  );
};

export default TransactionItem;
