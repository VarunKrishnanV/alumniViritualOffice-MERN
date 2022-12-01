import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: {},
    },
    reducers: {
        getUser: (state, { payload }) => {
            state.user = payload.user;
            state.fullName = payload.fullName;
            state.alumni_status = payload.alumni_status;
            state.user_type = payload.user_type;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = {};
            state.isAuthenticated = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getUser, logout } = authSlice.actions;

export default authSlice.reducer;
