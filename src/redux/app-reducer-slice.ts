import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IinitialStateApp } from "../types/types";
import { getAuthUserData } from "./auth-reducer-slice";

// whaiting responses of all fetches to API and then show App
export const initializApp = createAsyncThunk<void, void>(
    'authReducerSlice/getAuthUserData', async (_, { dispatch }) => {
        debugger
        const promiseAuthData = dispatch(getAuthUserData())
        Promise.all([promiseAuthData]).then(() => {
            debugger
            dispatch(initializing(true))
        })
        debugger
    }
)

// interface IinitialStateApp {
//     initialized: boolean
// }
const initialState: IinitialStateApp = {
    initialized: false
}
const appReducerSlice = createSlice({
    name: 'appReducerSlice',
    initialState,
    reducers: {
        initializing(state, action: PayloadAction<boolean>) {
            state.initialized = action.payload
        },
    }
})

export default appReducerSlice.reducer
export const { initializing } = appReducerSlice.actions