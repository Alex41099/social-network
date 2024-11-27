import { AnyAction, createSlice, Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { profileData, requestUpdateProfile, userApi } from "../../users/api/userApi"
import { Simulate } from "react-dom/test-utils"
import error = Simulate.error
import { RootState } from "../../../app/store"

type DomainInitialType = profileData & {
  isLoading: boolean
  status: string
}

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoading: false,
  } as DomainInitialType,
  reducers: (create) => ({
    setUserProfileData: create.reducer<{ profile: profileData }>((state, action) => {
      return { ...action.payload.profile, isLoading: false, status: "" }
    }),
    setProfileLoading: create.reducer<{ isLoading: boolean }>((state, action) => {
      state.isLoading = action.payload.isLoading
    }),
    setUserStatus: create.reducer<{ status: string }>((state, action) => {
      state.status = action.payload.status
    }),
    updateProfileStatus: create.reducer<{ status: string }>((state, action) => {
      state.status = action.payload.status
    }),
    updateProfile: create.reducer<{ data: requestUpdateProfile }>((state, action) => {
      return { ...state, ...action.payload.data }
    }),
  }),
})

export const profileReducer = profileSlice.reducer

export const { setUserProfileData, setProfileLoading, setUserStatus, updateProfileStatus, updateProfile } =
  profileSlice.actions

export const fetchUserProfileTC = (userId: number) => (dispatch: Dispatch) => {
  dispatch(setProfileLoading({ isLoading: true }))
  return userApi.getProfile(userId).then((res) => {
    dispatch(setUserProfileData({ profile: res.data }))
    dispatch(setProfileLoading({ isLoading: false }))
  })
}

export const getStatusTC = (userId: number) => (dispatch: Dispatch) => {
  dispatch(setProfileLoading({ isLoading: true }))
  return userApi.getUserStatus(userId).then((res) => {
    dispatch(setUserStatus({ status: res.data }))
    dispatch(setProfileLoading({ isLoading: false }))
  })
}

export const updateProfileStatusTC = (status: string) => (dispatch: Dispatch) => {
  dispatch(setProfileLoading({ isLoading: true }))
  return userApi.updateProfileStatus(status).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(updateProfileStatus({ status: status }))
    }
    dispatch(setProfileLoading({ isLoading: false }))
  })
}

export const updateProfileTC = (data: requestUpdateProfile) => (dispatch: Dispatch) => {
  dispatch(setProfileLoading({ isLoading: true }))
  return userApi
    .updateProfile(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(updateProfile({ data }))
      }
      dispatch(setProfileLoading({ isLoading: false }))
    })
    .catch((error) => {
      console.log(error)
      dispatch(setProfileLoading({ isLoading: false }))
    })
}

export const updateProfilePhotoTC =
  (photo: any, meId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(setProfileLoading({ isLoading: true }))
    return userApi
      .updateProfilePhoto(photo)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(fetchUserProfileTC(Number(meId)))
        }
        dispatch(setProfileLoading({ isLoading: false }))
      })
      .catch((error) => {
        console.log(error)
        dispatch(setProfileLoading({ isLoading: false }))
      })
      .finally(() => {
        dispatch(getStatusTC(Number(meId)))
      })
  }
