"use client"

import Link from "next/link"
import { AuthProvider } from "../../../../context/AuthContext";
import { useAuth } from "../../../../context/AuthContext"
import { FaPencilAlt } from "react-icons/fa";

interface EditButtonProps {
    articleId: string;
  }

function EditButton({ articleId }: EditButtonProps) {

    const { user } = useAuth();
    return (
        
        <AuthProvider>
            { user ? <div className="flex">
                            <Link className="flex mt-3 items-center bg-emerald-500 hover:bg-emerald-400 p-3 rounded-lg transition-all duration-300" href={`/articles/edit/${articleId}`}>
                                <FaPencilAlt className="mr-3"/> Edit Event
                            </Link>
                        </div>: <></>}    
        </AuthProvider>
        
    )
}

export default EditButton