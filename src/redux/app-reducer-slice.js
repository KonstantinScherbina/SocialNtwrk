import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthUserData } from "./auth-reducer-slice";

// whaiting responses of all fetches to API and then show App
export const initializApp = createAsyncThunk(
    'authReducerSlice/getAuthUserData', async (_, { rejectWithValue, dispatch }) => {
        debugger
        const promiseAuthData = dispatch(getAuthUserData())
        Promise.all([promiseAuthData]).then(() => {
            debugger
            dispatch(initializing(true))
        })
debugger
    }
)

const appReducerSlice = createSlice({
    name: 'appReducerSlice',
    initialState: {
        initialized: false
    },
    reducers: {
        initializing(state, action) {
            state.initialized = action.payload
        },
    }
})

export default appReducerSlice.reducer
export const { initializing } = appReducerSlice.actions