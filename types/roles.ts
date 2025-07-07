export interface User {
  userId: string
  name: string
  email: string
}

export interface Role {
  id: string
  name: string
  description: string
  members: User[]
}

export interface ApiResponse {
  roles: Role[]
}
