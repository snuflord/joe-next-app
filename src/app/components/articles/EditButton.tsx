"use client"

import Link from "next/link"
import { AuthProvider } from "../../../../context/AuthContext";
import { useAuth } from "../../../../context/AuthContext"
import { FaPencilAlt } from "react-icons/fa";

interface Article {
    id?: number,
    attributes?: {
        associatedUser?: string,
    }
}

interface EditButtonProps {
    article: Article;
}

function EditButton({ article }: EditButtonProps) {

    const { user } = useAuth();

    const articleUserId = article?.attributes?.associatedUser;
    const articleID = article?.id;
    const userId = user?.id;

    return (
        
        <AuthProvider>
            { userId && userId == articleUserId ? <div className="flex">
                            <Link className="flex mt-3 items-center bg-emerald-500 hover:bg-emerald-400 p-3 rounded-lg transition-all duration-300" href={`/articles/edit/${articleID}`}>
                                <FaPencilAlt className="mr-3"/> Edit Event
                            </Link>
                        </div>: <></>}    
        </AuthProvider>
        
    )
}

export default EditButton
