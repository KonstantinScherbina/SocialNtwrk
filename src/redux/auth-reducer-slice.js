import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

export const getAuthUserData = createAsyncThunk(
    'authReducerSlice/getAuthUserData', async (_, { rejectWithValue, dispatch }) => {
        const userData = await usersAPI.authAPIMe()
        if (userData.resultCode === 0) {
            const { id, login, email } = userData.data
            dispatch(setUserDataAction({ id, login, email, isAuth: true }))
        }
        return userData
    }

)

export const login = createAsyncThunk(
    'authReducerSlice/login', async (data, { rejectWithValue, dispatch }) => {
        const { email, password, rememberMe } = data
        const logIn = await usersAPI.authAPILogIn(email, password, rememberMe)
        debugger
        if (logIn.resultCode === 0) {
            debugger
            dispatch(getAuthUserData())
        } else {
            dispatch(setUserDataAction({ isError: true, errorMessage: logIn.messages }))
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
        isAuth: false,
        isError: false,
        errorMessage: null
    },
    reducers: {
        setUserDataAction(state, action) {
            state.id = action.payload.id
            state.login = action.payload.login
            state.email = action.payload.email
            state.isAuth = action.payload.isAuth
            state.isError = action.payload.isError
            state.errorMessage = action.payload.errorMessage
            debugger
        }
    }
})

export default authReducerSlice.reducer
export const { setUserDataAction } = authReducerSlice.actions
