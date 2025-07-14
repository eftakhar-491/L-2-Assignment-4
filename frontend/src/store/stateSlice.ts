import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  addBookModal: boolean;
}

const initialState: LoadingState = {
  addBookModal: false,
};

const addBookSlice = createSlice({
  name: "addBookModal",
  initialState,
  reducers: {
    setAddBookModal: (state) => {
      state.addBookModal = state.addBookModal ? false : true;
    },
  },
});

export const { setAddBookModal } = addBookSlice.actions;
export default addBookSlice;
