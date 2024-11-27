import { instance } from "../../../componets/common/instance/instance"

export type user = {
  name: string
  id: number
  photos: {
    small: string | null
    large: string | null
  }
  status: string | null
  followed: boolean
}
export type users = {
  items: user[]
  totalCount: number
  error: string | null
}

export type profileData = {
  aboutMe: string
  contacts: {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
  }
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  userId: number
  photos: {
    small: string
    large: string
  }
}
type Response = {
  resultCode: number
  messages: string[]
  data: {}
}

export type requestUpdateProfile = {
  aboutMe: string
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  }
}

export const userApi = {
  getUsers(page: string = "1") {
    return instance.get<users>(`users?page=${page}`)
  },
  getProfile(userId: number) {
    return instance.get<profileData>(`profile/${userId}`)
  },
  updateProfilePhoto(image: any) {
    const formData = new FormData()
    formData.append("image", image)

    return instance.put<Response>(`/profile/photo`, formData)
  },
  updateProfileStatus(status: string) {
    return instance.put<Response>(`/profile/status`, { status })
  },
  updateProfile(data: requestUpdateProfile) {
    return instance.put<Response>(`/profile`, data)
  },
  getUserStatus(userId: number) {
    return instance.get(`/profile/status/${userId}`)
  },
}
