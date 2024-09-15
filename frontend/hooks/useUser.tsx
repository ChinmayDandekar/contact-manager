import { fetchProtectedData } from "@/lib/auth"
import { useEffect, useState } from "react"


export type TUser = {
    name: string
    email: string
    city: string
    country: string
    phone: string
}

const useUser = () => {
    const [user, setUser] = useState<Partial<TUser>>({})
    
    useEffect(() => {
        const fetchUser = async () => {
            
            const res = await fetchProtectedData('/auth/me', 'GET')
            if(!res) return
            const data = await res.json()
            setUser(data)
        }

        fetchUser()
        
    }, [])

    return {user}
    



}

export default useUser