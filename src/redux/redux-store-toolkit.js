import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducerSlice from "./profile-reducer-slice";
import dialogsReducer from "./dialogs-reducer-slice";
import sidebarReducer from "./sidebar-reducer";
import authReducerSlice from "./auth-reducer-slice";
import usersReducerSlice from "./users-reducer-slice";

let reducers = combineReducers({
    auth: authReducerSlice,
    profilePage: profileReducerSlice,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducerSlice
});

let store = configureStore({ reducer: reducers });

window.store = store;


export default store;