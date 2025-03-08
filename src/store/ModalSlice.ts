import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../app/store.ts';

interface ModalState {
  open: boolean;
}

const initialState: ModalState = {
  open: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
      console.log("Modal open state:", state.open);
    },
    closeModal: (state) => {
      state.open = false;
      console.log("Modal open state:", state.open);
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectOpen = (state: RootState) => state.modal.open;
export const modalReducer =  modalSlice.reducer;
