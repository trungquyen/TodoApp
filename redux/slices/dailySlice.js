import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    content: "Pick up the kids",
    hour: 5,
    minute: 30,
    session: "pm"
}

export const dailySlice = createSlice({
    name: 'daily',
    initialState,
    reducers: {
        addDaily: (state, action) => {
            state.content = action.payload.content,
            state.hour = action.payload.hour,
            state.minute = action.payload.minute,
            state.session = action.payload.session
        },
    },
});

export const { addDaily } = dailySlice.actions;

export default dailySlice.reducer