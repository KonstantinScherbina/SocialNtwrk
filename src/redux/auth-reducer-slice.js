import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

export const getAuthUserData = createAsyncThunk(
    'authReducerSlice/fetchAuth', async (_, { rejectWithValue, dispatch }) => {
        const userData = await usersAPI.authAPI()
        if (userData.resultCode === 0) {
            const { id, login, email } = userData.data
            dispatch(setUserDataAction({ id, login, email }))
        }
    }
)

const authReducerSlice = createSlice({
    name: 'authReducerSlice',
    initialState: {

        id: null,
        login: null,
        email: null,
        isAuth: false

    },
    reducers: {
        setUserDataAction(state, action) {
            state.id = action.payload.id
            state.login = action.payload.login
            state.email = action.payload.email
            state.isAuth = true
        }
    }
})

export default authReducerSlice.reducer
export const { setUserDataAction } = authReducerSlice.actions
