import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    getDaily: null,
}

export const dailySlice = createSlice({
    name: 'daily',
    initialState,
    reducers: {
        getData: (state, action) => {
            state.getDaily = action.payload
        },
        resetDaily: (state) => {
            state.getDaily = null
        }
    },
});

export const { getData, resetDaily } = dailySlice.actions;

export default dailySlice.reducer