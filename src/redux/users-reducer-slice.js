import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { usersAPI } from "../api/api";



// sending selected page number to API for get Users on that page.
// dispatching received Users to reducer
// export const fetchUsersById = createAsyncThunk(
//     'usersReducerSlice/fetchUserById', async (currentPage, { rejectWithValue, dispatch }) => {
//         debugger
//         dispatch(toggleIsFetching(true))
//         const usersOnPage = await usersAPI.getUsersCurrentPage(currentPage)
//         dispatch(toggleIsFetching(false))
//         dispatch(setUsers(usersOnPage.items))
//         debugger
//     }
// )


// ---------------------------------------↓
// sending size of page to API for get all users devided on pages.
// dispatching received total count to reducer
export const getUsersPageSize = createAsyncThunk(
    'usersReducerSlice/fetchUsersPageSize', async (pageSize, { rejectWithValue, dispatch }) => {
        debugger
        dispatch(toggleIsFetching(true))
        const usersPageSize = await usersAPI.getUsersPageSize(pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setTotalUsersCount(usersPageSize.totalCount))
        debugger
    }
)

// ---------------↓
// sending number of pages to API for get all total count of user pages.
export const getUsersPage = createAsyncThunk(
    'usersReducerSlice/fetchUsersPageNumber', async (pageNumber, { rejectWithValue, dispatch }) => {
        debugger
        dispatch(toggleIsFetching(true))
        const usersPageNumber = await usersAPI.getUsersPageNumber(pageNumber)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(usersPageNumber.items))
        dispatch(setCurrentPage(pageNumber))
        debugger
    }
)



// export const getUsersPage = createAsyncThunk(
//     'usersReducerSlice/fetchUsersPageNumber', async (pageNumber, { rejectWithValue, dispatch }) => {
//         debugger
//         dispatch(toggleIsFetching(true))
//         const usersPageNumber = await usersAPI.getUsersPageNumber(pageNumber)
//         dispatch(setTotalUsersCount(usersPageNumber.totalCount))
//         dispatch(toggleIsFetching(false))
//         dispatch(setUsers(usersPageNumber.items))
//         dispatch(setCurrentPage(pageNumber))
//         debugger
//     }
// )


export let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: null,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
}

const usersReducerSlice = createSlice({
    name: 'usersReducerSlice',
    initialState,
    reducers: {
        followUsers(state, action) {
            state.users.map(u => {
                if (u.id === action.payload) {
                    u.followed = true
                } return u
            })
        },
        unfollowUsers(state, action) {
            state.users.map(u => {
                if (u.id === action.payload) {
                    u.followed = false
                } return u;
            })
        },
        setUsers(state, action) {
            state.users = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setTotalUsersCount(state, action) {
            debugger
            state.totalUsersCount = action.payload
        },
        toggleIsFetching(state, action) {
            state.isFetching = action.payload
        },
        toggleFollowingProgress(state, action) {

            action.payload.isFetch
                ? state.followingInProgress.push(action.payload.id)
                : state.followingInProgress = state.followingInProgress.filter(id => id !== action.payload.id)

        }
    },
    // extraReducers: builder => {
    //     builder.addCase(fetchUsersById.pending, (state, action) => {
    //         console.log('fetchUsersById.pending')
    //     })
    //     builder.addCase(fetchUsersById.fulfilled, (state, action) => {
    //         console.log('fetchUsersById.fulfilled')
    //     })
    //     builder.addCase(fetchUsersById.rejected, (state, action) => {
    //         console.log('fetchUsersById.rejected')
    //     })

    //     // -------------------------------------------

    //     builder.addCase(fetchUsersPageSize.pending, (state, action) => {
    //         console.log('fetchUsersPageSize.pending')
    //     })
    //     builder.addCase(fetchUsersPageSize.fulfilled, (state, action) => {
    //         console.log('fetchUsersPageSize.fulfilled')
    //     })
    //     builder.addCase(fetchUsersPageSize.rejected, (state, action) => {
    //         console.log('fetchUsersPageSize.rejected')
    //     })

    // }
})






export default usersReducerSlice.reducer
export const { followUsers, unfollowUsers, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowingProgress } = usersReducerSlice.actions
