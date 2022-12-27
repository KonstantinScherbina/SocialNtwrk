import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { usersAPI } from "../api/api";


export let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: null,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

export const fetchUsersById = createAsyncThunk(
    'usersReducerSlice/fetchUserById', async (currentPage, { rejectWithValue, dispatch }) => {
        dispatch(toggleIsFetching(true))
        const usersOnPage = await usersAPI.getUsersCurrentPage(currentPage)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(usersOnPage.items))
    }
)

export const fetchUsersPageSize = createAsyncThunk(
    'usersReducerSlice/fetchUsersPageSize', async (pageSize, { rejectWithValue, dispatch }) => {
        dispatch(toggleIsFetching(true))
        const usersPageSize = await usersAPI.getUsersPageSize(pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setTotalUsersCount(usersPageSize.totalCount))
        debugger
    }
)

export const fetchUsersPageNumber = createAsyncThunk(
    'usersReducerSlice/fetchUsersPageNumber', async (pageNumber, { rejectWithValue, dispatch }) => {
        dispatch(toggleIsFetching(true))
        const usersPageNumber = await usersAPI.getUsersPageNumber(pageNumber)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(usersPageNumber.items))
        dispatch(setCurrentPage(pageNumber))
    }
)

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
            state.totalUsersCount = action.payload
        },
        toggleIsFetching(state, action) {
            state.isFetching = action.payload
        },
        toggleFollowingProgress(state, action) {
            console.log(Array.isArray(state.followingInProgress))
            action.payload.isFetch
                ? state.followingInProgress.push(action.payload.id)
                : state.followingInProgress = state.followingInProgress.filter(id => id != action.payload.id)
            console.log(Array.isArray(state.followingInProgress))
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUsersById.pending, (state, action) => {
            console.log('fetchUsersById.pending')
        })
        builder.addCase(fetchUsersById.fulfilled, (state, action) => {
            console.log('fetchUsersById.fulfilled')
        })
        builder.addCase(fetchUsersById.rejected, (state, action) => {
            console.log('fetchUsersById.rejected')
        })

        // -------------------------------------------

        builder.addCase(fetchUsersPageSize.pending, (state, action) => {
            console.log('fetchUsersPageSize.pending')
        })
        builder.addCase(fetchUsersPageSize.fulfilled, (state, action) => {
            console.log('fetchUsersPageSize.fulfilled')
        })
        builder.addCase(fetchUsersPageSize.rejected, (state, action) => {
            console.log('fetchUsersPageSize.rejected')
        })

    }
})






export default usersReducerSlice.reducer
export const { followUsers, unfollowUsers, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowingProgress } = usersReducerSlice.actions
