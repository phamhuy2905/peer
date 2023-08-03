import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MessageType {
    id: string;
    userName: string;
    message: string;
    time?: Date;
}
interface initialStateType {
    dataMessage: MessageType[];
}
const initialState: initialStateType = {
    dataMessage: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        sendOneMessage(state, action: PayloadAction<MessageType>) {
            state.dataMessage.push(action.payload);
        },
        sendAllMessage(state, action: PayloadAction<MessageType[]>) {
            state.dataMessage = action.payload;
        },
    },
});

const chatReducer = chatSlice.reducer;
export const { sendOneMessage, sendAllMessage } = chatSlice.actions;
export default chatReducer;
