import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface UserState {
  username: string;
  email: string;
  tags: string[];
}

const initialState: UserState = {
  username: "",
  email: "",
  tags: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      return (state = action.payload);
    },
    logout: (state) => {
      return (state = {
        username: "",
        email: "",
        tags: [],
      });
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
