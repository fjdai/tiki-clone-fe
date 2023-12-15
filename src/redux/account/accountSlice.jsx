import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        "email": "",
        "phone": "",
        "fullName": "",
        "role": "",
        "avatar": "",
        "id": ""
    }
}

export const accountSlide = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doGetAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.user;
        },
        doLogoutAction: (state, action) => {
            localStorage.removeItem("access_token");
            state.isAuthenticated = false;
            state.user = {
                "email": "",
                "phone": "",
                "fullName": "",
                "role": "",
                "avatar": "",
                "id": ""
            };
        },
        doUpdateInfoAction: (state, action) => {
            state.user.fullName = action.payload.fullName;
            state.user.phone = action.payload.phone;
            state.user.avatar = action.payload.avatar;
        }
    },

})

export const { doLoginAction, doGetAccountAction, doLogoutAction, doUpdateInfoAction } = accountSlide.actions

export default accountSlide.reducer