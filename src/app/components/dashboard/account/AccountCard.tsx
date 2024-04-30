'use client'

import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext"
import { User as NextAuthUser} from "next-auth";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import UsersCards from "./UsersCards";



interface User extends NextAuthUser {
    username: string;
  }

export default function AccountCard() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { user, token, deleteUser } = useAuth();
    const [thisUser, setThisUser] = useState<User | null>(null); // Set initial state to null or undefined

    useEffect(() => {
        // Update thisUser state when user changes - initial is null
        if (user) {
            setThisUser(user as User);
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
        <div className="mt-2 p-5 shadow-2xl bg-gradient-to-r min-h-[50vh] from-indigo-500 to-emerald-600 rounded-lg w-full md:w-3/4">
            <div className="flex flex-col space-y-3">
                <h3 className="font-bold text-1xl md:text-2xl">Username: {thisUser?.username}</h3>
                {/* <span className="text-1xl md:text-2xl">Account created on {new Date(thisUser?.createdAt).toLocaleDateString("en-UK")}</span> */}
                <span>User ID: {thisUser?.id}</span>
                <span className="text-1xl md:text-2xl">Email: {thisUser?.email}</span>
            </div>
            <UsersCards />

            <Button className="my-4" onPress={onOpen}>Delete Account</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} placement={"center"}>
                <ModalContent className="bg-slate-900">
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 font-bold text-1xl md:text-2xl">DELETE ACCOUNT?</ModalHeader>

                    <ModalBody>
                        <p className="font-bold text-1xl">Are you sure you want to delete your account? Your media items won't be deleted alongside your account</p>

                        <button className="p-4 transition-colors duration-300 bg-red-500 hover:bg-red-600 rounded-lg" onClick={handleDeleteUser}>Delete Account</button>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onPress={onClose}>Back!</Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    )
}
