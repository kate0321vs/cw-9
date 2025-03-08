import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../app/store.ts';

interface ModalState {
  open: boolean;
  type: "add" | "edit" | null;
}

const initialState: ModalState = {
  open: false,
  type: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.open = true;
      state.type = "add";
    },
    openEditModal: (state) => {
      state.open = true;
      state.type = "edit";
    },
    closeModal: (state) => {
      state.open = false;
      state.type = null;
    },
  },
});

export const { openAddModal, openEditModal, closeModal } = modalSlice.actions;
export const selectOpen = (state: RootState) => state.modal.open;
export const modalReducer = modalSlice.reducer;
