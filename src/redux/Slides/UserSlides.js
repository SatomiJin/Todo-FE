import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  displayName: "",
  phoneNumber: "",
  gender: "",
  image: "",
  role: "",
  access_token: "",
  refresh_token: "",
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        access_token = "",
        refresh_token = "",
        email = "",
        displayName = "",
        phoneNumber = "",
        gender = "",
        image = "",
        role = "",
      } = action.payload;
      state.email = email ? email : state.email;
      state.displayName = displayName ? displayName : state.displayName;
      state.phoneNumber = phoneNumber ? phoneNumber : state.phoneNumber;
      state.gender = gender ? gender : state.gender;
      state.image = image ? image : state.image;
      state.role = role ? role : state.role;
      state.access_token = access_token ? access_token : state.access_token;
      state.refresh_token = refresh_token ? refresh_token : state.refresh_token;
    },
    resetUser: (state) => {
      state.email = "";
      state.displayName = "";
      state.phoneNumber = "";
      state.gender = "";
      state.image = "";
      state.role = "";
      state.access_token = "";
      state.refresh_token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
