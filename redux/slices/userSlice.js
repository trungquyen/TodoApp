import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      addUser: (state, action) => {
        state.user = action.payload
      },
    },
  });
  
export const { addUser } = userSlice.actions;
  
export default userSlice.reducer;