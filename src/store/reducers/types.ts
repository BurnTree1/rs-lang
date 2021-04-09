export type AuthorizationState = {
  email: string,
  password: string,
  image: string,
  isAuthorized: boolean,
  isSignInSuccessfully: boolean,
  error: boolean,
}

export type CreateNewUserType = {
  email: string,
  password: string,
  name: string
  image: Blob
}

export type SignIn = {
  email: string,
  password: string
}
