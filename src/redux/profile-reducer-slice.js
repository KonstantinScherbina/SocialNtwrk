import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profileAPI, usersAPI } from "../api/api";


export const fetchGetProfile = createAsyncThunk(
    'profileReducerSlice/fetchGetProfile', async (userId, { rejectWithValue, dispatch }) => {
        dispatch(toggleIsFetchingAction(true))
        const getProfileUserId = await usersAPI.getProfile(userId)
        dispatch(toggleIsFetchingAction(false))
        dispatch(setUserProfileAction(getProfileUserId))
        debugger
    }
)
export const fetchGetMyProfile = createAsyncThunk(
    'profileReducerSlice/fetchGetMyProfile', async (myId, { rejectWithValue, dispatch }) => {
        dispatch(toggleIsFetchingAction(true))
        const getMyProfileUserId = await usersAPI.getMyProfile(myId)
        dispatch(toggleIsFetchingAction(false))
        dispatch(setUserProfileAction(getMyProfileUserId))
        debugger
    }
)
export const getStatus = createAsyncThunk(
    'profileReducerSlice/getStatus', async (userId, { rejectWithValue, dispatch }) => {
        const getStatus = await usersAPI.getStatus(userId)
        dispatch(setUserStatus(getStatus))
        debugger
    }
)
export const updateStatus = createAsyncThunk(
    'profileReducerSlice/updateStatus', async (status, { rejectWithValue, dispatch }) => {
        const resultCodeStatus = await usersAPI.updateStatus(status)
        debugger

        if (resultCodeStatus.resultCode === 0) {
            dispatch(setUserStatus(status))
            debugger
        }

    }

)

const profileReducerSlice = createSlice({
    name: "profileReducerSlice",
    initialState: {
        isFetching: true,
        newPostText: 'Your Post',
        profile: null,
        status: '',
        posts: [
            { id: 1, message: 'Hi, how are you?', likesCount: 12 },
            { id: 2, message: 'It\'s my first post', likesCount: 11 },
            { id: 3, message: 'Blabla', likesCount: 11 },
            { id: 4, message: 'Dada', likesCount: 11 }
        ]
    },
    reducers: {
        addPostAction(state) {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            state.posts.push(newPost)
            state.newPostText = ''
        },
        updateNewpostTextAction(state, action) {
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
            debugger
        },
    }
})

export default profileReducerSlice.reducer
export const { addPostAction, updateNewpostTextAction, toggleIsFetchingAction, setUserProfileAction, setUserStatus } = profileReducerSlice.actions