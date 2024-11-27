import { configureStore } from "@reduxjs/toolkit"
import { usersReducer, usersSlice } from "../features/users/model/usersSlice"
import { authReducer, authSlice } from "../features/auth/model/authSlice"
import { profileReducer, profileSlice } from "../features/profile/model/profileSlice"

export const store = configureStore({
  reducer: {
    [usersSlice.name]: usersReducer,
    [authSlice.name]: authReducer,
    [profileSlice.name]: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
