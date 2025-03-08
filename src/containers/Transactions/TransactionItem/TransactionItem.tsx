import { Box, Card, IconButton, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Transaction, Category } from '../../../types';
import { openEditModal } from '../../../store/ModalSlice.ts';
import { useDispatch } from 'react-redux';

interface Props {
  transaction: Transaction;
  categories: Category[];
}

const TransactionItem: React.FC<Props> = ({ transaction, categories }) => {
  const dispatch = useDispatch();

  const category = categories.find((cat) => cat.id === transaction.category);



  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: 2, boxShadow: 2 }}>
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
      <IconButton title="удалить">
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default TransactionItem;
