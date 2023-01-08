import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

export const getAuthUserData = createAsyncThunk(
    'authReducerSlice/getAuthUserData', async (_, { rejectWithValue, dispatch }) => {
        const userData = await usersAPI.authAPIMe()
        if (userData.resultCode === 0) {
            const { id, login, email } = userData.data
            dispatch(setUserDataAction({ id, login, email, isAuth: true }))
        }
    }
)

export const login = createAsyncThunk(
    'authReducerSlice/login', async (data, { rejectWithValue, dispatch }) => {
        const { email, password, rememberMe } = data
        const logIn = await usersAPI.authAPILogIn(email, password, rememberMe)
        if (logIn.resultCode === 0) {
            debugger
            dispatch(getAuthUserData())
        }
    }
)

export const logout = createAsyncThunk(
    'authReducerSlice/logout', async (_, { rejectWithValue, dispatch }) => {
        debugger
        const logOut = await usersAPI.authAPILogOut()
        if (logOut.resultCode === 0) {
            dispatch(setUserDataAction({ id: null, login: null, email: null, isAuth: false }))
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
            state.isAuth = action.payload.isAuth
        }
    }
})

export default authReducerSlice.reducer
export const { setUserDataAction } = authReducerSlice.actions
