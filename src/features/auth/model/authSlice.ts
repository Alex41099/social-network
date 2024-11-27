import {AnyAction, createSlice, Dispatch, ThunkAction} from "@reduxjs/toolkit"
import {authApi, meUserData, RequestLoginData} from "../api/authApi"
import {RootState} from "../../../app/store";

type initialStateType = {
  isInitialized: boolean
  isLogged: boolean
  meData: meUserData
  progressLinear: number
  burgerToggle: boolean
  isMeProfile: boolean
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isInitialized: false,
    isLogged: false,
    meData: {},
    progressLinear: 0,
    burgerToggle: false,
    isMeProfile: false,
  } as initialStateType,
  reducers: (create) => ({
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
    setIsLogged: create.reducer<{ isLogged: boolean }>((state, action) => {
      state.isLogged = action.payload.isLogged
    }),
    setMeUserData: create.reducer<{ data: meUserData }>((state, action) => {
      state.meData = action.payload.data
    }),
    setProgressLinear: create.reducer<{ progressLinear: number }>((state, action) => {
      state.progressLinear = action.payload.progressLinear
    }),
    setBurgerToggle: create.reducer<{ burgerToggle: boolean }>((state, action) => {
      state.burgerToggle = action.payload.burgerToggle
    }),
    setIsMeProfile: create.reducer<{ isMeProfile: boolean }>((state, action) => {
      state.isMeProfile = action.payload.isMeProfile
    }),
  }),
})

export const authReducer = authSlice.reducer

export const { setIsInitialized, setIsLogged, setMeUserData, setProgressLinear, setBurgerToggle, setIsMeProfile } =
  authSlice.actions

export const initializedTC = () => (dispatch: Dispatch) => {
  dispatch(setProgressLinear({ progressLinear: 60 }))
  return authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setMeUserData({ data: res.data.data }))
        dispatch(setIsLogged({ isLogged: true }))
      } else {
        dispatch(setIsLogged({ isLogged: false }))
        console.log(res.data.messages)
      }
    })
    .catch((error) => {
      dispatch(setIsLogged({ isLogged: false }))
    })
}

export const loginTC = (data: RequestLoginData): ThunkAction<any, RootState, unknown, AnyAction> => (dispatch) => {
  return authApi.login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          localStorage.setItem("sn-token", res.data.data.token)
          dispatch(initializedTC()).then(() => {
              dispatch(setIsLogged({ isLogged: true }))
          })
        } else {
          dispatch(setIsLogged({ isLogged: false }))
          console.log(res.data.messages)
        }
      })
      .catch((error) => {
        dispatch(setIsLogged({ isLogged: false }))
      })
}

export const logoutTC = (): ThunkAction<any, RootState, unknown, AnyAction> => (dispatch) => {
  return authApi.logout()
      .then((res) => {
        if (res.data.resultCode === 0) {
          localStorage.removeItem("sn-token")
          dispatch(setBurgerToggle({ burgerToggle: false }))
          dispatch(setIsMeProfile({isMeProfile: false}))
          dispatch(setIsLogged({ isLogged: false }))
        }
      })

}
