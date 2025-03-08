import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
  Select,
  Grid,
  MenuItem,
  TextField,
  SelectChangeEvent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonSpinner from '../Spinner/ButtonSpinner/ButtonSpinner.tsx';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { TransactionForm } from '../../../types';
import { useAppSelector } from '../../../app/hook.ts';
import { selectCategories } from '../../../store/categoriesSlice.ts';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  submitAction: (transaction: TransactionForm) => void;
  isLoading?: boolean;
  transaction?: TransactionForm;
}

const initialForm = {
  category: '',
  amount: 0,
  createdAt: ''
};

const initialCategory = {
  type: '',
  name: ''
}

const TrackerModal: React.FC<CartModalProps> = ({
  open,
  onClose,
  submitAction,
  isLoading,
  transaction
}) => {
  const [form, setForm] = useState<TransactionForm>(initialForm);
  const categories = useAppSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState<{ name: string, type: string }>(initialCategory);
  const types = ['income', 'expense'];
  const [selectedType, setSelectedType] = useState<string>('');


  useEffect(() => {
    if(transaction) {
      setForm({...transaction});
    }
  }, [transaction]);

  const onChangeSelect = (e: SelectChangeEvent<string>) => {
    const {name, value} = e.target;

    if (name === 'type') {
      setSelectedType(value);
      setSelectedCategory({name: '', type: value});
      setForm({...form, category: ''});
    } else {
      setSelectedCategory({...selectedCategory, [name]: value});
    }
  };

  useEffect(() => {
    const category = categories.find(cat => cat.name === selectedCategory.name);
    if (category) {
      setForm({...form, category: category.id});
    }
  }, [selectedCategory]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      amount: +e.target.value,
      createdAt: new Date().toISOString()
    });

  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitAction(form);
    setForm(initialForm);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 420,
          backgroundColor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton onClick={onClose} sx={{position: 'absolute', top: 12, right: 12, color: 'grey.700'}}>
          <CloseIcon/>
        </IconButton>

        <Typography variant="h5" sx={{textAlign: 'center', fontWeight: 'bold', mb: 2}}>
          Add Expense/Income
        </Typography>

        <Divider sx={{mb: 3}}/>

        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                name="type"
                value={selectedCategory.type}
                fullWidth
                displayEmpty
                onChange={onChangeSelect}
                disabled={isLoading}
                required
              >
                <MenuItem value="" disabled>Select type</MenuItem>
                {types.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Select
                name="name"
                value={selectedCategory.name}
                fullWidth
                displayEmpty
                disabled={isLoading}
                required
                onChange={onChangeSelect}
              >
                <MenuItem value="" disabled>Select category</MenuItem>
                {categories
                  .filter(cat => cat.type === selectedType)
                  .map((category) => (
                    <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                  ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{width: '100%'}}
                label="Amount"
                name="amount"
                variant="outlined"
                type="number"
                onChange={onChange}
                value={form.amount}
                disabled={isLoading}
                required
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button onClick={onClose} variant="outlined" color="secondary" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              {isLoading && <ButtonSpinner/>} Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};


export default TrackerModal;
