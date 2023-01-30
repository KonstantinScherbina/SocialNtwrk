import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { securityAPI, usersAPI } from "../api/api";


// Fetch to API for take authentification data, 
// if resultCode = 0 all allright, dispatch {id, login, email} to a reducer 
export const getAuthUserData = createAsyncThunk(
    'authReducerSlice/getAuthUserData', async (_, { dispatch }) => {
        const userData = await usersAPI.authAPIMe()
        debugger
        if (userData.resultCode === 0) {
            const { id, login, email } = userData.data
            dispatch(setUserDataAction({ id, login, email, isAuth: true }))
        }
        return userData.resultCode
    }

)

// Send to API authentification datas. If resultcode = 0 (if '10' create 'get' request to API for captcha),
// create fetch to API for take authentification data
export const login = createAsyncThunk(
    'authReducerSlice/login', async (data, { dispatch }) => {
        const { email, password, rememberMe } = data
        const logIn = await usersAPI.authAPILogIn(email, password, rememberMe)
        debugger
        if (logIn.resultCode === 0) {
            dispatch(getAuthUserData())
        } else if (login.resultCode === 10) {
            dispatch(getCaptchaUrlThunk())
        } else {
            dispatch(setUserDataAction({ isError: true, errorMessage: logIn.messages }))
        }
    }
)


export const logout = createAsyncThunk(
    'authReducerSlice/logout', async (_, { dispatch }) => {
        const logOut = await usersAPI.authAPILogOut()
        if (logOut.resultCode === 0) {
            dispatch(setUserDataAction({ id: null, login: null, email: null, isAuth: false }))
        }
    }
)


// fetch to get Captch for login
export const getCaptchaUrlThunk = createAsyncThunk(
    'authReducerSlice/getCaptchaUrlThunk', async (_, { rejectWithValue, dispatch }) => {
        debugger
        const result_getCaptchaUrl = await securityAPI.getCaptchaUrl()
        dispatch(setCaptchaUrl(result_getCaptchaUrl))
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
        errorMessage: null,
        captchaObj: {
            captcha: null,
        }
    },
    reducers: {
        setUserDataAction(state, action) {
            state.id = action.payload.id
            state.login = action.payload.login
            state.email = action.payload.email
            state.isAuth = action.payload.isAuth
            state.isError = action.payload.isError
            state.errorMessage = action.payload.errorMessage
        },
        setCaptchaUrl(state, action) {
            debugger
            state.captchaObj.captcha = action.payload
        }
    }
})

export default authReducerSlice.reducer
export const { setUserDataAction, setCaptchaUrl } = authReducerSlice.actions
