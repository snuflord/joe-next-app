'use client'

import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext"
import { User } from "next-auth";

export default function AccountCard() {

    const { user, token, deleteUser } = useAuth();
    const [thisUser, setThisUser] = useState<User | null>(null); // Set initial state to null or undefined

    useEffect(() => {
        // Update thisUser state when user changes
        if (user) {
            setThisUser(user);
        }
    }, [user]);

    const handleDeleteUser = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log(thisUser?.id); // Access user ID from state
        console.log(token);

        if (thisUser) {
            const userObj = {
                userId: thisUser.id,
                token: token
            };
            deleteUser(userObj);
        }
    }

    return (
        <div className="mt-2 p-5 shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-lg w-full md:w-3/4">
            <div className="flex flex-col space-y-3">
                <h3 className="font-bold text-2xl">Username: {thisUser?.username}</h3>
                <span className="text-2xl">Account created on {new Date(thisUser?.createdAt).toLocaleDateString("en-UK")}</span>
                <span className="text-2xl">Email: {thisUser?.email}</span>
                <span>{thisUser?.id}</span>
            </div>
            {/*  OPEN MODAL ON DELETE, THEN CONTAIN ACTUAL DELETE REQUEST  */}
            <button onClick={handleDeleteUser}>Delete Account</button>
        </div>
    )
}
