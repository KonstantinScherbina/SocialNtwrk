import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

// request to get ANOTHER profile Page from API by 'userId' from useParams
// dispatch another profile page data to reducer
export const getAnotherProfile = createAsyncThunk(
    'profileReducerSlice/getAnotherProfile', async (userId, { rejectWithValue, dispatch }) => {

        dispatch(toggleIsFetchingAction(true))
        const getProfileUserId = await usersAPI.getProfile(userId)
        dispatch(toggleIsFetchingAction(false))
        dispatch(setUserProfileAction(getProfileUserId))
    }
)



// request to get MY profile Page from API by 'userId' from useParams
// dispatch my profile page data to reducer
export const getMyProfile = createAsyncThunk(
    'profileReducerSlice/getMyProfile', async (myId, { rejectWithValue, dispatch }) => {

        dispatch(toggleIsFetchingAction(true))
        const getMyProfileUserId = await usersAPI.getMyProfile(myId)
        dispatch(toggleIsFetchingAction(false))
        dispatch(setUserProfileAction(getMyProfileUserId))
    }
)

// request to get profile status from API.
// dispatch received status to reducer
export const getStatus = createAsyncThunk(
    'profileReducerSlice/getStatus', async (userId, { rejectWithValue, dispatch }) => {

        const getStatus = await usersAPI.getStatus(userId)
        dispatch(setUserStatus(getStatus))
    }
)

// sending status to API and dispatching the received status to reducer
export const updateStatus = createAsyncThunk(
    'profileReducerSlice/updateStatus', async (status, { rejectWithValue, dispatch }) => {
        const resultCodeStatus = await usersAPI.updateStatus(status)

        if (resultCodeStatus.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    }
)

// sending Photo to API and dispatching the received Photo to reducer
export const savePhoto = createAsyncThunk(
    'profileReducerSlice/savePhoto', async (photoFile, { rejectWithValue, dispatch }) => {

        const resultCodeProfilePhoto = await usersAPI.savePhoto(photoFile)
        if (resultCodeProfilePhoto.resultCode === 0) {

            dispatch(setProfilePhotos(resultCodeProfilePhoto.data.photos))
        }
    }
)
debugger

// sending my profile status to API and dispatching the status to reducer
export const myProfileInfoThunk = createAsyncThunk(
    'profileReducerSlice/profileInfoData', async (profileInfo, _) => {
        debugger
        const resultCodeProfileInfo = await usersAPI.updateProfileInfo(profileInfo)
        console.log(resultCodeProfileInfo)
        debugger
        if (resultCodeProfileInfo.resultCode === 0) {
            getMyProfile()
        }
    }
)

const profileReducerSlice = createSlice({
    name: "profileReducerSlice",
    initialState: {
        isFetching: false,
        newPostText: 'Your Post',
        // profile: { photos: '' },
        profile: '',
        photos: '',
        status: '',
        posts: [
            { id: 1, message: 'Hi, how are you?', likesCount: 12 },
            { id: 2, message: 'It\'s my first post', likesCount: 11 },
            { id: 3, message: 'Blabla', likesCount: 11 },
            { id: 4, message: 'Dada', likesCount: 11 }
        ]
    },
    reducers: {
        addPostAction(state, action) {
            // let newPost = {
            //     id: 5,
            //     message: state.newPostText,
            //     likesCount: 0
            // };
            let newPost = {
                id: 5,
                message: action.payload,
                likesCount: 0
            };
            state.posts.push(newPost)
            state.newPostText = ''
        },
        deletePostAction(state, action) {
            state.posts = state.posts.filter(p => p.id !== action.payload)
        },
        updateNewpostTextAction(state, action) {
            state.newPostText = action.payload
        },
        toggleIsFetchingAction(state, action) {
            state.isFetching = action.payload
        },
        setUserProfileAction(state, action) {
            debugger
            state.profile = action.payload
        },
        setUserStatus(state, action) {
            state.status = action.payload

        },
        setProfilePhotos(state, action) {
            debugger
            state.photos = action.payload
        }
    }
})

export default profileReducerSlice.reducer
export const { addPostAction, deletePostAction, updateNewpostTextAction, toggleIsFetchingAction, setUserProfileAction, setUserStatus, setProfilePhotos } = profileReducerSlice.actions