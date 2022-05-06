import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { Profile, GetProfilesResponse } from "../interfaces/profile.interface";

export const ProfileContext = createContext< Profile | boolean | any>({})

export default function ProfileProvider({children}:any){
    const [profiles, setProfiles] = useState<Profile[]>([])

    useEffect (() => {
        fetchProfiles();
      }, [])
    
    const fetchProfiles = async () => {
        try {
            const { data: response } = await axios.get<GetProfilesResponse>("https://user-managing-api.herokuapp.com/api/profiles/");
            setProfiles(response.profiles);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ProfileContext.Provider value={{ profiles: profiles, setProfiles :setProfiles, fetchProfiles: fetchProfiles}}>
            {children}
        </ProfileContext.Provider>
    )
}