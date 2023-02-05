import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

// request to get ANOTHER profile Page from API by 'userId' from useParams
// dispatch another profile page data to reducer
export const getAnotherProfile = createAsyncThunk<any, number | null>(
    'profileReducerSlice/getAnotherProfile', async (userId, { rejectWithValue, dispatch }) => {
        try {
            dispatch(toggleIsFetchingAction(true))
            const getAnotherProfileUserId: IProfileInfo = await usersAPI.getProfile(userId)
            debugger
            dispatch(toggleIsFetchingAction(false))
            dispatch(setUserProfileAction(getAnotherProfileUserId))
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)



// request to get MY profile Page from API by 'userId' from useParams
// dispatch my profile page data to reducer
export const getMyProfile = createAsyncThunk<any, number | null>(
    'profileReducerSlice/getMyProfile', async (myId, { rejectWithValue, dispatch }) => {
        debugger
        try {
            debugger
            dispatch(toggleIsFetchingAction(true))
            const getMyProfileUserId: IProfileInfo = await usersAPI.getMyProfile(myId)
            debugger
            dispatch(toggleIsFetchingAction(false))
            dispatch(setUserProfileAction(getMyProfileUserId))
            debugger
        } catch (err: any) {
            debugger
            return rejectWithValue(err.response.data)
        }
    }
)

// request to get profile status from API.
// dispatch received status to reducer
export const getStatus = createAsyncThunk<any, number | null>(
    'profileReducerSlice/getStatus', async (userId, { rejectWithValue, dispatch }) => {
        try {
            const getStatus: string = await usersAPI.getStatus(userId)
            dispatch(setUserStatus(getStatus))
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)

interface IResultCodeStatus<T> {
    data: { photos?: { large: T, small: T } }
    fieldsErrors: any[]
    messages: any[]
    resultCode: number
}

// sending status to API and dispatching the received status to reducer
export const updateStatus = createAsyncThunk<any, string | null>(
    'profileReducerSlice/updateStatus', async (status, { rejectWithValue, dispatch }) => {
        try {
            const resultCodeStatus: IResultCodeStatus<string> = await usersAPI.updateStatus(status)
            debugger
            if (resultCodeStatus.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)

// sending Photo to API and dispatching the received Photo to reducer
export const savePhoto = createAsyncThunk<any, any | null>(
    'profileReducerSlice/savePhoto', async (photoFile, { rejectWithValue, dispatch }) => {
        try {
            const resultCodeProfilePhoto: IResultCodeStatus<string> = await usersAPI.savePhoto(photoFile)
            debugger
            if (resultCodeProfilePhoto.resultCode === 0) {
                dispatch(setProfilePhotos(resultCodeProfilePhoto.data.photos))
            }
        } catch (err: any) {
            return rejectWithValue(err.response.data.message)
        }
    }
)
debugger


export interface IMyProfileInfoThunk {
    aboutMe: string
    contacts: {
        facebook: string
        github: string
        instagram: string
        mainLink: string
        twitter: string
        vk: string
        website: string
        youtube: string
    }
    fullName: string
    lookingForAJobDescription: string
    lookingForAjob: boolean
}

// sending my profile status to API and dispatching the status to reducer
export const myProfileInfoThunk = createAsyncThunk<any, IMyProfileInfoThunk>(
    'profileReducerSlice/profileInfoData', async (profileInfo, { rejectWithValue, dispatch }) => {
        try {
            debugger
            const resultCodeProfileInfo = await usersAPI.updateProfileInfo(profileInfo)
            debugger
            if (resultCodeProfileInfo.resultCode === 0) {
                console.log(resultCodeProfileInfo.resultCode)
            }
        } catch (err: any) {
            debugger
            console.log(err)
            // return rejectWithValue(err.response.data.message)
            // const error = rejectWithValue(err.response.data.message)
            dispatch(setError(err.response.data.message))
        }
    }
)

interface IProfileInfo {
    aboutMe: string | null
    contacts: {
        facebook: string | null
        github: string | null
        instagram: string | null
        mainLink: string | null
        twitter: string | null
        vk: string | null
        website: string | null
        youtube: string | null
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    photos: {
        small: string | null,
        large: string | null
    }
    userId: number | null
}

interface IInitialState {
    isFetching: boolean
    profile: IProfileInfo | null
    photos: string | null
    status: string | null
    posts: {
        id: number | null
        message: string | null
        likesCount: number | null
    }[]
    editMode: boolean
    error: string | null
}

interface INewPost {
    id: number
    message: any
    likesCount: number
}

// type a = typeof initialState

//  const initialState = {
//     isFetching: false,
//     profile: '',
//     photos: '',
//     status: '',
//     posts: [
//         { id: 1, message: 'Hi, how are you?', likesCount: 12 },
//         { id: 2, message: 'Hi, how are you?', likesCount: 12 },
//     ],
//     editMode: false,
//     error: ''
// }

const initialState: IInitialState = {
    isFetching: false,
    profile: null,
    photos: '',
    status: '',
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'Hi, how are you?', likesCount: 12 },
    ],
    editMode: false,
    error: ''
}

const profileReducerSlice = createSlice({
    name: "profileReducerSlice",
    initialState,
    reducers: {
        addPostAction(state, action) {
            debugger
            let id = state.posts.map(p => p.id)
            let idsp: any = id.slice(-1)
            let newPost: INewPost = {
                id: ++idsp,
                message: action.payload,
                likesCount: 0
            };
            debugger
            state.posts.push(newPost)
        },
        deletePostAction(state, action) {
            state.posts = state.posts.filter(p => p.id !== action.payload)
        },
        toggleIsFetchingAction(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        },
        setUserProfileAction(state, action: PayloadAction<IProfileInfo>) {
            debugger
            state.profile = action.payload
        },
        setUserStatus(state, action) {
            state.status = action.payload
        },
        setProfilePhotos(state, action) {
            state.photos = action.payload
        },
        setEditMode(state, action) {
            debugger
            state.editMode = action.payload
        },
        setError(state, action) {
            debugger
            state.error = action.payload
        }
    }
})

console.log(profileReducerSlice)

export default profileReducerSlice.reducer
export const {
    addPostAction,
    deletePostAction,
    toggleIsFetchingAction,
    setUserProfileAction,
    setUserStatus,
    setProfilePhotos,
    setEditMode,
    setError } = profileReducerSlice.actions