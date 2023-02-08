import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";
import { IinitialStateProfile, InewPost, IprofileInfo } from "../types/types";

// request to get ANOTHER profile Page from API by 'userId' from useParams
// dispatch another profile page data to reducer
export const getAnotherProfile = createAsyncThunk<any, number | null>(
    'profileReducerSlice/getAnotherProfile', async (userId, { rejectWithValue, dispatch }) => {
        try {
            dispatch(toggleIsFetchingAction(true))
            const getAnotherProfileUserId = await usersAPI.getProfile(userId)
            debugger
            dispatch(toggleIsFetchingAction(false))
            dispatch(setUserProfileAction(getAnotherProfileUserId))
            dispatch(getStatus(userId))
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
            const getMyProfileUserId: IprofileInfo = await usersAPI.getMyProfile(myId)
            debugger
            dispatch(toggleIsFetchingAction(false))
            dispatch(setUserProfileAction(getMyProfileUserId))
            dispatch(getStatus(myId))
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
            const getStat = await usersAPI.getStatus(userId)
            debugger
            dispatch(setUserStatus(getStat))
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)


// sending status to API and dispatching the received status to reducer
export const updateStatus = createAsyncThunk<any, string>(
    'profileReducerSlice/updateStatus', async (status, { rejectWithValue, dispatch }) => {
        try {
            const resultCodeStatus = await usersAPI.updateStatus(status)
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
export const savePhoto = createAsyncThunk<void | string, File>(
    'profileReducerSlice/savePhoto', async (photoFile, { rejectWithValue, dispatch }) => {
        try {
            const resultCodeProfilePhoto = await usersAPI.savePhoto(photoFile)
            if (resultCodeProfilePhoto.resultCode === 0) {
                dispatch(setProfilePhotos(resultCodeProfilePhoto.data.photos))
            }
        } catch (err: any) {
            return rejectWithValue(err.response.data.message)
        }
    }
)


// export interface IMyProfileInfoThunk {
//     aboutMe: string
//     contacts: {
//         facebook: string
//         github: string
//         instagram: string
//         mainLink: string
//         twitter: string
//         vk: string
//         website: string
//         youtube: string
//     }
//     fullName: string
//     lookingForAJobDescription: string
//     lookingForAjob: boolean
// }

// sending my profile status to API and dispatching the status to reducer
export const myProfileInfoThunk = createAsyncThunk<any, IprofileInfo>(
    'profileReducerSlice/profileInfoData', async (profileInfo, { rejectWithValue, dispatch }) => {
        try {
            const resultCodeProfileInfo = await usersAPI.updateProfileInfo(profileInfo)
            if (resultCodeProfileInfo.resultCode === 0) {
                console.log(resultCodeProfileInfo.resultCode)
            }
        } catch (err: any) {
            console.log(err)
            // return rejectWithValue(err.response.data.message)
            // const error = rejectWithValue(err.response.data.message)
            dispatch(setError(err.response.data.message))
        }
    }
)

// export interface IProfileInfo {
//     aboutMe: string | null
//     contacts: {
//         facebook: string | null
//         github: string | null
//         instagram: string | null
//         mainLink: string | null
//         twitter: string | null
//         vk: string | null
//         website: string | null
//         youtube: string | null
//     }
//     fullName: string
//     lookingForAJob: boolean
//     lookingForAJobDescription: string | null
//     photos: {
//         small: string | null,
//         large: string | null
//     }
//     userId: number | null
// }

// interface IInitialState {
//     isFetching: boolean
//     profile: IProfileInfo | null
//     photos: string | null
//     status: string | null
//     posts: {
//         id: number | null
//         message: string | null
//         likesCount: number | null
//     }[]
//     editMode: boolean
//     error: string | null
// }

// interface INewPost {
//     id: number | null
//     message: string | null
//     likesCount: number | null
// }


const initialState: IinitialStateProfile = {
    isFetching: false,
    profile: {
        aboutMe: null,
        contacts: {
            facebook: null,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: null,
            website: null,
            youtube: null,
        },
        fullName: null,
        lookingForAJob: false,
        lookingForAJobDescription: null,
        photos: {
            small: null,
            large: null
        },
        userId: null
    },
    status: '',
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'Hi, how are you?', likesCount: 12 },
    ],
    editMode: false,
    error: null
}

const profileReducerSlice = createSlice({
    name: "profileReducerSlice",
    initialState,
    reducers: {
        addPostAction(state, action) {

            let id = state.posts.map(p => p.id)
            let idU: any = id.slice(-1)


            let newPost: InewPost = {
                id: ++idU,
                message: action.payload,
                likesCount: 0
            };

            state.posts.push(newPost)
        },
        deletePostAction(state, action) {
            state.posts = state.posts.filter(p => p.id !== action.payload)
        },
        toggleIsFetchingAction(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        },
        setUserProfileAction(state, action: PayloadAction<IprofileInfo>) {
            state.profile = action.payload
        },
        setUserStatus(state, action: PayloadAction<string>) {
            state.status = action.payload
        },
        setProfilePhotos(state, action: PayloadAction<{ large: string, small: string }>) {
            state.profile.photos = action.payload
        },
        setEditMode(state, action) {
            state.editMode = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
})

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