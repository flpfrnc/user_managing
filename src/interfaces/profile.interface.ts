import { User } from "./user.interface"

export type Profile = {
    id: number,
    related_user: User,
    name: string,
    last_name: string,
    birth_date: string
  }
  
  export type GetProfilesResponse = {
    profiles: []
  }