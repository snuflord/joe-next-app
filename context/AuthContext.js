'use client'

import { createContext, useState, useEffect } from "react";
import { NEXT_URL } from "../config";
import { useRouter } from "next/navigation";

const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const router = useRouter()


    const register = async (user) => {
        // This request is made to /api/register (see pages > api > register.js)
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            // body is the email and password from the form
            body: JSON.stringify(user)
        })
        const data = await res.json()
        console.log(data)

        if(res.ok) {
            // setUser is the function to set the state
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data)
            // setError(null)
        }
    }

    return (
        <AuthContext.Provider value={{user, error, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext