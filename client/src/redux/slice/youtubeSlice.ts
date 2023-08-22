import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { formatTimeYtb } from "../../utils/format";

export interface InfoYtbType {
    title: string;
    videoId: string;
    thumbnail: string;
    isLive: boolean;
    duration: string | number;
}
interface InitialType {
    infomation: InfoYtbType[];
    currentId: string;
    statusYoutube: 0 | 1;
}
const initialState: InitialType = {
    infomation: [
        {
            title: "Best of lofi hip hop 2022 🎆 - beats to relax/study to",
            videoId: "xJ7EF7XweiA",
            thumbnail: `https://img.youtube.com/vi/${"w5IpoFvizlI"}/default.jpg`,
            isLive: true,
            duration: "Live",
        },
    ],
    currentId: "xJ7EF7XweiA",
    statusYoutube: 0,
};

export const getApiYtb = createAsyncThunk<InfoYtbType, string>("youtube/getApiYtb", async (id: string, thunkAPI) => {
    const data = (await axios.get(`https://ytb-video-finder.vercel.app/api/${id}`)).data;
    return {
        title: data.title,
        videoId: id,
        thumbnail: `https://img.youtube.com/vi/${id}/default.jpg`,
        isLive: data.isLive || false,
        duration: +data.lengthSeconds ? formatTimeYtb(+data.lengthSeconds) : "Live",
    };
});
const youtubeSlice = createSlice({
    name: "youtube",
    initialState,
    reducers: {
        addArrayYoutube(state, action: PayloadAction<InfoYtbType[]>) {
            state.infomation = action.payload;
        },
        updateCurrentId(state, action: PayloadAction<string>) {
            state.currentId = action.payload;
        },
        emptyDisonnecYtb(state) {
            state = initialState;
        },
        updateStatusYoutube(state) {
            state.statusYoutube = 1;
        },

        updateVideoEnd(state) {},
    },
    extraReducers(builder) {
        builder.addCase(getApiYtb.fulfilled, (state, action) => {
            state.infomation.push(action.payload);
        });
    },
});

const youtubeReducer = youtubeSlice.reducer;
export const { addArrayYoutube, updateCurrentId, emptyDisonnecYtb, updateStatusYoutube } = youtubeSlice.actions;
export default youtubeReducer;
