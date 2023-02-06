import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
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

export interface IpageSizAndNumber {
    error: number | null
    items: Iusers[] | null[]
    totalCount: number | null
}

interface Iusers {
    name: string | null,
    id: number | null,
    uniqueUrlName: string | null,
    photos: {
        large: string | null
        small: string | null
    },
    status: string | null
    followed: boolean
}

export interface IuserSubscribe {
    data: {}
    resultCode: number
    fieldsErrors: any,
    messages: any
}

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
export const getUsersPage = createAsyncThunk<void, { pageNumber: number, pageSize: number }>(
    'usersReducerSlice/fetchUsersPageNumber', async ({ pageNumber, pageSize }, { dispatch }) => {
        dispatch(toggleIsFetching(true))
        const usersPageNumber = await usersAPI.getUsersPageNumber(pageNumber, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(usersPageNumber.items))
        dispatch(setCurrentPage(pageNumber))
        dispatch(setTotalUsersCount(usersPageNumber.totalCount))

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


// interface Imap {
//     [id: number]: any
// }

// const map: Imap = {

// }

// const map = new Map<number, any>()

// const map: Record<number, any> = {}


interface IinitialState {
    users: Iusers[] | null[]
    pageSize: number | null
    totalUsersCount: number | null,
    currentPage: number | null,
    isFetching: boolean,
    followingInProgress: any[],
}


export let initialState: IinitialState = {
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
        setUsers(state, action: PayloadAction<Iusers[] | null[]>) {
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
