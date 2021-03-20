import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : 0,
}

const savannahSlice = createSlice({
    name: 'savannah',
    initialState,
    reducers: {
        consolelog(state) {
            state.value += 1;
            console.log(state.value)
        },
    },
})

export const { consolelog } = savannahSlice.actions;
export default  savannahSlice.reducer

