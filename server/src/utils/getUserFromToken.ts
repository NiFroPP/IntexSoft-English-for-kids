import jwtDecode from 'jwt-decode'

interface User {
  _id: string
  email: string
  password: string
  username: string
  role: string
  favoriteCategory: string[]
}

interface DecodeToken {
  user: User
  exp: number
  iat: number
}

export const getUserFromToken = (data: string): User => {
  const tokenDecode: DecodeToken = jwtDecode(data.split(' ')[1])

  return tokenDecode.user
}
