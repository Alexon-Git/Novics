export interface IProfile {
  profileInfo: string | null
  role: string | null
}

export interface IAuthState {
  authData: {
    accessToken: string | null
    isLoading: boolean
    error: string | null
  }
  profileData: {
    profile: IProfile,
    isLoading: boolean
    error: string | null
  }
}
