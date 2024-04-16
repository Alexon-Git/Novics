export interface ISignUpRequest {
  firstName: string
  lastName: string
  surName: string
  email: string
  password: string
}

export interface ISignInRequest {
  email: string
  password: string
}

export interface ITokenResponse {
  accessToken: string
}
