import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slice/appSlice";
import youtubeReducer from "./slice/youtubeSlice";
import { useDispatch } from "react-redux";
import chatReducer from "./slice/chatSlice";
const store = configureStore({
    reducer: {
        app: appReducer,
        youtube: youtubeReducer,
        chat: chatReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
