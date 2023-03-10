import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { securityAPI, usersAPI } from "../api/api";
import { IinitialStateAuth, ImyAuthData } from "../types/types";

// export interface IapiResponseResult {
//     data: {
//         id?: number,
//         login?: string,
//         email?: string
//         photos?: { large: string, small: string }
//     },
//     resultCode: number,
//     fieldsErrors?: any[],
//     messages?: string[]
// }

//TODO fix dublicats

// Fetch to API for take authentification data, 
// if resultCode = 0 all allright, dispatch {id, login, email} to a reducer 
//WOOOOOOOOOORK
export const getAuthUserData = createAsyncThunk<number, void>(
    'authReducerSlice/getAuthUserData', async (_, { dispatch }) => {
        const userData = await usersAPI.authAPIMe()
        debugger
        const { id, login, email } = userData.data
        if (userData.resultCode === 0) {
            dispatch(setUserDataAction({
                id: id, login: login, email: email, isAuth: true,
                isError: false, errorMessage: null,
            }))
        }
        return userData.resultCode
    }
)

// export interface ImyAuthData {
//     email: string
//     password: string
//     rememberMe: boolean
// }


// Send to API authentification datas. If resultcode = 0 (if '10' create 'get' request to API for captcha),
// create fetch to API for take authentification data
// WOOOOOOOOOOOOOOOOORK
export const login = createAsyncThunk<void, ImyAuthData>(
    'authReducerSlice/login', async (data, { dispatch }) => {
        const { email, password, rememberMe } = data
        const logIn = await usersAPI.authAPILogIn(email, password, rememberMe)
        debugger
        if (logIn.resultCode === 0) {
            dispatch(getAuthUserData())
        } else if (logIn.resultCode === 10) {
            dispatch(getCaptchaUrlThunk())
        } else {
            dispatch(setUserDataAction({
                id: null, login: null, email: null, isAuth: false,
                isError: true, errorMessage: logIn.messages,
            }))
        }
    }
)


export const logout = createAsyncThunk<void, void>(
    'authReducerSlice/logout', async (_, { dispatch }) => {
        const logOut = await usersAPI.authAPILogOut()
        debugger
        if (logOut.resultCode === 0) {
            debugger
            dispatch(setUserDataAction(initialState))
        }
    }
)

// fetch to get Captch for login
export const getCaptchaUrlThunk = createAsyncThunk<void, void>(
    'authReducerSlice/getCaptchaUrlThunk', async (_, { dispatch }) => {
        debugger
        const result_getCaptchaUrl = await securityAPI.getCaptchaUrl()
        dispatch(setUserDataAction({
            id: null, login: null, email: null, isAuth: false,
            isError: false, errorMessage: null, captcha: result_getCaptchaUrl
        }))
    }
)


// export interface IinitialState {
//     id?: number | null,
//     login?: string | null,
//     email?: string | null,
//     isAuth?: boolean,
//     isError?: boolean,
//     errorMessage?: string[] | null,
//     captcha?: string | null
// }


const initialState: IinitialStateAuth = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    isError: false,
    errorMessage: null,
    captcha: null,
}

const authReducerSlice = createSlice({
    name: 'authReducerSlice',
    initialState,
    reducers: {
        setUserDataAction(state, action: PayloadAction<IinitialStateAuth>) {
            debugger
            state.id = action.payload.id
            state.login = action.payload.login
            state.email = action.payload.email
            state.isAuth = action.payload.isAuth
            state.isError = action.payload.isError
            state.errorMessage = action.payload.errorMessage
            state.captcha = action.payload.captcha
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getAuthUserData.fulfilled, (state, action: any) => {
    //         state.id = action.payload.id
    //         state.login = action.payload.login
    //         state.email = action.payload.email
    //         debugger
    //     }),
    //         builder.addCase(login.fulfilled, (state, { payload }) => {
    //             // id: null, login: null, email, isAuth: true, isError: false, errorMessage: logIn.messages, captchaObj: { captcha: null }
    //             state.id = payload.id
    //             state.login = payload.login
    //             state.email = payload.email
    //         })
    // }
})

export default authReducerSlice.reducer
export const { setUserDataAction } = authReducerSlice.actions
