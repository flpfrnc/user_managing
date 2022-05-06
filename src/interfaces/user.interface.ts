export type User = {
    id: number,
    username: string,
    password: string,
    email: string,
    created_ad: string,
    updated_at: string,
  }
  
export type GetUsersResponse = {
    users: []
  }