import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

// request to get ANOTHER profile Page from API by 'userId' from useParams
// dispatch another profile page data to reducer
export const getAnotherProfile = createAsyncThunk(
    'profileReducerSlice/getAnotherProfile', async (userId, { rejectWithValue, dispatch }) => {
        try {
            dispatch(toggleIsFetchingAction(true))
            const getProfileUserId = await usersAPI.getProfile(userId)
            dispatch(toggleIsFetchingAction(false))
            dispatch(setUserProfileAction(getProfileUserId))
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

// request to get MY profile Page from API by 'userId' from useParams
// dispatch my profile page data to reducer
export const getMyProfile = createAsyncThunk(
    'profileReducerSlice/getMyProfile', async (myId, { rejectWithValue, dispatch }) => {
        try {
            debugger
            dispatch(toggleIsFetchingAction(true))
            const getMyProfileUserId = await usersAPI.getMyProfile(myId)
            dispatch(toggleIsFetchingAction(false))
            dispatch(setUserProfileAction(getMyProfileUserId))
            debugger
        } catch (err) {
            debugger
            return rejectWithValue(err.response.data)
        }
    }
)

// request to get profile status from API.
// dispatch received status to reducer
export const getStatus = createAsyncThunk(
    'profileReducerSlice/getStatus', async (userId, { rejectWithValue, dispatch }) => {
        try {
            const getStatus = await usersAPI.getStatus(userId)
            dispatch(setUserStatus(getStatus))
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

// sending status to API and dispatching the received status to reducer
export const updateStatus = createAsyncThunk(
    'profileReducerSlice/updateStatus', async (status, { rejectWithValue, dispatch }) => {
        try {
            const resultCodeStatus = await usersAPI.updateStatus(status)
            if (resultCodeStatus.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

// sending Photo to API and dispatching the received Photo to reducer
export const savePhoto = createAsyncThunk(
    'profileReducerSlice/savePhoto', async (photoFile, { rejectWithValue, dispatch }) => {
        try {
            const resultCodeProfilePhoto = await usersAPI.savePhoto(photoFile)
            if (resultCodeProfilePhoto.resultCode === 0) {

                dispatch(setProfilePhotos(resultCodeProfilePhoto.data.photos))
            }
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)
debugger

// sending my profile status to API and dispatching the status to reducer
export const myProfileInfoThunk = createAsyncThunk(
    'profileReducerSlice/profileInfoData', async (profileInfo, { rejectWithValue, dispatch }) => {
        try {
            debugger
            const resultCodeProfileInfo = await usersAPI.updateProfileInfo(profileInfo)
            debugger
            if (resultCodeProfileInfo.resultCode === 0) {
                console.log(resultCodeProfileInfo.resultCode)
            }
        } catch (err) {
            debugger
            console.log(err)
            // return rejectWithValue(err.response.data.message)
            // const error = rejectWithValue(err.response.data.message)
            dispatch(setError(err.response.data.message))
        }
    }
)

const profileReducerSlice = createSlice({
    name: "profileReducerSlice",
    initialState: {
        isFetching: false,
        profile: '',
        photos: '',
        status: '',
        posts: [
            { id: 1, message: 'Hi, how are you?', likesCount: 12 },
            { id: 2, message: 'Hi, how are you?', likesCount: 12 },
        ],
        editMode: false,
        error: ''
    },
    reducers: {
        addPostAction(state, action) {
            debugger
            let id = state.posts.map(p => p.id)
            let idsp = id.slice(-1)
            let newPost = {
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
        updateNewpostTextAction(state, action) {
            debugger
            state.newPostText = action.payload
        },
        toggleIsFetchingAction(state, action) {
            state.isFetching = action.payload
        },
        setUserProfileAction(state, action) {
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

export default profileReducerSlice.reducer
export const {
    addPostAction,
    deletePostAction,
    updateNewpostTextAction,
    toggleIsFetchingAction,
    setUserProfileAction,
    setUserStatus,
    setProfilePhotos,
    setEditMode,
    setError } = profileReducerSlice.actions