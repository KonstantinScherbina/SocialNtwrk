import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { securityAPI, usersAPI } from "../api/api";


type userDataType = {
    data: {
        id: number,
        login: string,
        email: string
    },
    resultCode: number,
    fieldsErrors?: any,
    messages?: any
}

//TODO fix dublicats

// Fetch to API for take authentification data, 
// if resultCode = 0 all allright, dispatch {id, login, email} to a reducer 
//WOOOOOOOOOORK
export const getAuthUserData = createAsyncThunk(
    'authReducerSlice/getAuthUserData', async (_, { dispatch }) => {
        const userData: userDataType = await usersAPI.authAPIMe()
        debugger
        if (userData.resultCode === 0) {
            dispatch(setUserDataAction({
                userData: userData.data, isAuth: true, isError: false, errorMessage: null
            }))
        }
        return userData.resultCode
    }
)

interface IData {
    email: string
    password: string
    rememberMe: boolean
}

// Send to API authentification datas. If resultcode = 0 (if '10' create 'get' request to API for captcha),
// create fetch to API for take authentification data
// WOOOOOOOOOOOOOOOOORK
export const login = createAsyncThunk(
    'authReducerSlice/login', async (data: IData, { dispatch }) => {
        const { email, password, rememberMe } = data
        const logIn = await usersAPI.authAPILogIn(email, password, rememberMe)
        debugger
        if (logIn.resultCode === 0) {
            dispatch(getAuthUserData())
        } else if (logIn.resultCode === 10) {
            dispatch(getCaptchaUrlThunk())
        } else {
            dispatch(setUserDataAction({ userData: { id: null, login: null, email: email }, isAuth: true, isError: false, errorMessage: logIn.messages, captchaObj: { captcha: null } }))
        }
    }
)


// export const getAuthUserData = createAsyncThunk<any, void>(
//     'authReducerSlice/getAuthUserData', async (_, { dispatch }) => {
//         const userData: userDataType = await usersAPI.authAPIMe()
//         debugger
//         if (userData.resultCode === 0) {
//             debugger
//             return userData.data
//         }
//         return userData.resultCode
//     }

// )


// export const login = createAsyncThunk<any, any>(
//     'authReducerSlice/login', async (data, { dispatch }) => {
//         const { email, password, rememberMe } = data
//         const logIn = await usersAPI.authAPILogIn(email, password, rememberMe)
//         debugger
//         if (logIn.resultCode === 0) {
//             debugger
//             dispatch(getAuthUserData())
//         } else if (logIn.resultCode === 10) {
//             debugger
//             dispatch(getCaptchaUrlThunk())
//         } else {
//             debugger
//             // return { id: null, login: null, email, isAuth: true, isError: false, errorMessage: logIn.messages, captchaObj: { captcha: null } }
//             dispatch(setUserDataAction({ id: null, login: null, email, isAuth: true, isError: false, errorMessage: logIn.messages, captchaObj: { captcha: null } }))
//         }
//     }
// )



// { isError: true, errorMessage: logIn.messages }

export const logout = createAsyncThunk(
    'authReducerSlice/logout', async (_, { dispatch }) => {
        const logOut = await usersAPI.authAPILogOut()
        debugger
        if (logOut.resultCode === 0) {
            debugger
            dispatch(setUserDataAction({ userData: { id: null, login: null, email: null }, isAuth: false, isError: false, errorMessage: null, captchaObj: { captcha: null } }))
        }
    }
)
// { id: null, login: null, email: null, isAuth: false }

// fetch to get Captch for login
export const getCaptchaUrlThunk = createAsyncThunk(
    'authReducerSlice/getCaptchaUrlThunk', async (_, { dispatch }) => {
        debugger
        const result_getCaptchaUrl = await securityAPI.getCaptchaUrl()
        dispatch(setCaptchaUrl(result_getCaptchaUrl))
    }
)


export interface AuthReducerSliceType {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    isError: boolean,
    errorMessage: string | null,
    captchaObj: {
        captcha: string | null,
    }
}

// export interface ISetUserDataAction {
//     id?: number | null,
//     login?: string | null | undefined,
//     email?: string | null | undefined,
//     isAuth?: boolean,
//     isError?: boolean,
//     errorMessage?: string | null | undefined
// }

const initialState: AuthReducerSliceType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    isError: false,
    errorMessage: null,
    captchaObj: {
        captcha: null,
    }
}

const authReducerSlice = createSlice({
    name: 'authReducerSlice',
    initialState,
    reducers: {
        setUserDataAction(state, action: PayloadAction<any>) {
            debugger
            state.id = action.payload.userData.id
            state.login = action.payload.userData.login
            state.email = action.payload.userData.email
            state.isAuth = action.payload.isAuth
            state.isError = action.payload.isError
            state.errorMessage = action.payload.errorMessage
        },
        setCaptchaUrl(state, action: PayloadAction<any>) {
            debugger
            state.captchaObj.captcha = action.payload
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
export const { setUserDataAction, setCaptchaUrl } = authReducerSlice.actions
