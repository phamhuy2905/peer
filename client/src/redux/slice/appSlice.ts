import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileType {
    id: string;
    userName: string;
}
interface initialStateType {
    profile: ProfileType;
    profileClients: ProfileType[];
    isLoading: boolean;
    isConected: boolean;
}
const initialState: initialStateType = {
    profile: {
        id: "",
        userName: "",
    },
    profileClients: [],
    isLoading: false,
    isConected: false,
};
const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addProfile(state, action: PayloadAction<ProfileType>) {
            state.profile.id = action.payload.id;
            state.profile.userName = action.payload.userName;
        },
        addPeer(state, acction: PayloadAction<ProfileType>) {
            state.profileClients.push(acction.payload);
        },
        resetPeer(state, action: PayloadAction<ProfileType[]>) {
            state.profileClients = action.payload;
        },
        emptyDisonnectPeer(state) {
            state.profileClients = [];
        },
        removeOnePeer(state, action: PayloadAction<string>) {
            state.profileClients = state.profileClients.filter((val) => val.id !== action.payload);
        },
        startFetching(state) {
            state.isLoading = true;
        },
        endFetching(state) {
            state.isLoading = false;
        },
        turnOfConnected(state) {
            state.isConected = false;
        },
        turnOnconnected(state) {
            state.isConected = true;
        },
    },
});

const appReducer = appSlice.reducer;
export const {
    addPeer,
    addProfile,
    startFetching,
    endFetching,
    resetPeer,
    turnOfConnected,
    turnOnconnected,
    emptyDisonnectPeer,
    removeOnePeer,
} = appSlice.actions;
export default appReducer;
