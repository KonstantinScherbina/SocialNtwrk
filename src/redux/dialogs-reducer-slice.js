import { createSlice } from "@reduxjs/toolkit"


let initialState = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ],
    messages: [],
    newMessageBody: ""
};


const dialogsReducerSlice = createSlice({
    name: 'dialogsReducerSlice',
    initialState,
    reducers: {
        updateNewMessageBody(state, action) {
            debugger
            state.newMessageBody = action.payload
        },
        sendMessage(state) {
            debugger
            const newMessage = state.newMessageBody
            state.messages.push(newMessage)
            state.newMessageBody = ''
            debugger
        }
    }
})


export default dialogsReducerSlice.reducer
export const { updateNewMessageBody, sendMessage } = dialogsReducerSlice.actions
