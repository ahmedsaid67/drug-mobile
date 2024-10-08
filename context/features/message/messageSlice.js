import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
    autoHideDuration: 3300,
    message: "",
    variant: null,
  },
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.state = true;
      state.options = {
        ...initialState.options,
        ...action.payload,
      };
    },
    hideMessage: (state, action) => {
      state.state = null;
    },
  },
});

export const { hideMessage, showMessage } = messageSlice.actions;

export default messageSlice.reducer;
