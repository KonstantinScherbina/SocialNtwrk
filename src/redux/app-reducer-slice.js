import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthUserData } from "./auth-reducer-slice";


export const initializApp = createAsyncThunk(
    'authReducerSlice/getAuthUserData', async (_, { rejectWithValue, dispatch }) => {
        const promiseAuthData = dispatch(getAuthUserData())
        Promise.all([promiseAuthData]).then(() => {
            dispatch(initializing(true))
        })

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