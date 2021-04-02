const baseUrl = "https://rs-lang2021.herokuapp.com/";
type AuthorizationState = {
  email: string,
  password: string
  image: string
}

export const AppCreateNewUser = async (userData: AuthorizationState) => {
  const response =  await fetch(`${baseUrl}signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  return response.json()
}


