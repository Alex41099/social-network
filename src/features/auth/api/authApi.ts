import { instance } from "../../../componets/common/instance/instance"

export type meUserData = {
  id: number
  email: string
  login: string
}

type ResponseGet<T> = {
  resultCode: number
  messages: string[]
  data: T
}

export type RequestLoginData = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

export const authApi = {
  me() {
    return instance.get<ResponseGet<meUserData>>("auth/me")
  },

  login(data: RequestLoginData) {
    return instance.post<ResponseGet<{userId: number, token: string}>>("auth/login", data)
  },

  logout() {
    return instance.delete<ResponseGet<{}>>("auth/login")
  },
}

