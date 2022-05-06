import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { User, GetUsersResponse } from "../interfaces/user.interface";

export const UserContext = createContext<User | boolean | any>({})

export default function UserProvider({children}:any){
    const [users, setUsers] = useState<User[]>([])

    useEffect (() => {
        fetchUsers();
      }, [])
    
    const fetchUsers = async () => {  
        try {
            const { data: response } = await axios.get<GetUsersResponse>("https://user-managing-api.herokuapp.com/api/users/")
            setUsers(response.users)
        } catch(error) { 
            console.log(error)
        }
    }

    return (
        <UserContext.Provider value={{ users : users, setUsers: setUsers, fetchUsers: fetchUsers }}>
            {children}
        </UserContext.Provider>
    )
}