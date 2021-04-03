export const LocalStorageService = {
  getToken: (): string | null => {
    const token = localStorage.getItem('token');
    if (token) return JSON.parse(token)
    return null
  },
  setToken: (token: string) => {
    localStorage.setItem('token', JSON.stringify(token))
  },
  setUserId: (userId: string) => {
    localStorage.setItem('userId', JSON.stringify(userId))
  },
  getUserId: (): string | null => {
    const userId = localStorage.getItem('userId');
    if (userId) return JSON.parse(userId)
    return null
  }
}




