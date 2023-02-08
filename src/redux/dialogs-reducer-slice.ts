import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IinitialStateDialogs } from "../types/types";


// export interface IInitialStateDialogs {
//     dialogs: {
//         id: number
//         name: string
//     }[]
//     messages: any[]
//     newMessageBody: string
// }

let initialState: IinitialStateDialogs = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
    ],
    messages: [],
    newMessageBody: "",
};


const dialogsReducerSlice = createSlice({
    name: 'dialogsReducerSlice',
    initialState,
    reducers: {
        updateNewMessageBody(state, action: PayloadAction<string>) {
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
