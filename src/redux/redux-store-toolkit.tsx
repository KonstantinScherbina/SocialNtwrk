import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducerSlice from "./profile-reducer-slice";
import dialogsReducerSlice from "./dialogs-reducer-slice";
import sidebarReducer from "./sidebar-reducer";
import authReducerSlice from "./auth-reducer-slice";
import usersReducerSlice from "./users-reducer-slice";
import appReducerSlice from "./app-reducer-slice";


let reducers = combineReducers({
    auth: authReducerSlice,
    profilePage: profileReducerSlice,
    dialogsPage: dialogsReducerSlice,
    sidebar: sidebarReducer,
    usersPage: usersReducerSlice,
    app: appReducerSlice
});

let store = configureStore({ reducer: reducers });





export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;