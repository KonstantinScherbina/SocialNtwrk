import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { usersAPI } from "../api/api";
import { IinitialStateUsers, Iusers } from "../types/types";



// export interface IpageSizAndNumber {
//     error: number | null
//     items: Iusers[] | null[]
//     totalCount: number | null
// }

// interface Iusers {
//     name: string | null,
//     id: number | null,
//     uniqueUrlName: string | null,
//     photos: {
//         large: string | null
//         small: string | null
//     },
//     status: string | null
//     followed: boolean
// }


// ---------------------------------------↓
// sending size of page to API for get all users devided on pages.
// dispatching received total count to reducer
// export const getUsersPageSize = createAsyncThunk<void, number | null>(
//     'usersReducerSlice/fetchUsersPageSize', async (pageSize, { dispatch }) => {
//         debugger
//         dispatch(toggleIsFetching(true))
//         const usersPageSize = await usersAPI.getUsersPageSize(pageSize)
//         debugger
//         dispatch(toggleIsFetching(false))
//         dispatch(setTotalUsersCount(usersPageSize.totalCount))
//         debugger
//     }
// )

// ---------------↓
// sending number of pages to API for get all total count of user pages.
export const getUsersPage = createAsyncThunk<void, { pageNumber: number, pageSize: number}>(
    'usersReducerSlice/fetchUsersPageNumber', async ({ pageNumber, pageSize }, { dispatch }) => {
        dispatch(toggleIsFetching(true))
        const usersPageNumber = await usersAPI.getUsersPageNumber(pageNumber, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(usersPageNumber.items))
        dispatch(setCurrentPage(pageNumber))
        dispatch(setTotalUsersCount(usersPageNumber.totalCount))
    }
)


// interface IinitialState {
//     users: Iusers[] | null[]
//     pageSize: number
//     totalUsersCount: number | null,
//     currentPage: number,
//     isFetching: boolean,
//     followingInProgress: number[],
// }


export let initialState: IinitialStateUsers = {
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
        followUsers(state, action: PayloadAction<number | null>) {
            state.users.map(u => {
                if (u?.id === action.payload) {
                    u.followed = true
                } return u
            })
        },
        unfollowUsers(state, action: PayloadAction<number | null>) {
            state.users.map(u => {
                if (u?.id === action.payload) {
                    u.followed = false
                } return u;
            })
        },
        setUsers(state, action: PayloadAction<Iusers[]>) {
            state.users = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setTotalUsersCount(state, action: PayloadAction<number | null>) {

            state.totalUsersCount = action.payload
        },
        toggleIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        },
        toggleFollowingProgress(state, action: PayloadAction<{ isFetch: boolean, id: number }>) {
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
export const {
    followUsers,
    unfollowUsers,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress
} = usersReducerSlice.actions
