import { createSlice, Dispatch } from "@reduxjs/toolkit"
import { userApi, users } from "../api/userApi"

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    totalCount: 0,
    error: null,
  } as users,

  reducers: (create) => ({
    setUsers: create.reducer<{ users: users }>((state, action) => {
      return action.payload.users
    }),
  }),
})

export const usersReducer = usersSlice.reducer
export const { setUsers } = usersSlice.actions
export const {} = usersSlice.selectors

export const setUsersTC =
  (page: string = "1") =>
  (dispatch: Dispatch) => {
    return userApi.getUsers(page).then((res) => {
      dispatch(setUsers({ users: res.data }))
    })
  }
