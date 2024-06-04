'use client'

import { getAllUserArticles } from "@/app/lib/alldata"
import { Card } from "../Cards"
import { CardSkeleton } from "@/app/ui/skeletons"
import { Key, Suspense, useEffect, useState } from "react"
import clsx from "clsx";
import { useAuth } from "../../../../../context/AuthContext"

export default function UsersCards() {

    const [currentPage, setCurrentPage] = useState(1);
    const [articlesList, setArticlesList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const { user } = useAuth();

    useEffect(() => {
        const fetchArticles = async () => {
            if (user) {
                try {
                    const json = await getAllUserArticles(user.id, { page: currentPage });
                    setArticlesList(json.data);
                    setLoading(false); // Set loading to false after data is fetched
                } catch (error) {
                  console.error('Error fetching user articles:', error);
                }
              }
        };

        fetchArticles();
    }, [currentPage, user]); // Include currentPage in dependency array to re-fetch articles when page changes

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (
        <div className="w-full flex flex-col md:flex-col-reverse">

            <div className="flex py-2 mt-2 md:py-4 w-full items-center justify-start md:justify-end space-x-5">
                <button className={clsx("rounded-lg p-2 md:p-4 bg-emerald-500 hover:bg-emerald-600 font-bold", {"bg-gray-900 hover:bg-gray-900": currentPage === 1})} onClick={handlePrevPage} disabled={currentPage === 1}>Prev Page</button>
                <button className={clsx("rounded-lg p-2 md:p-4 bg-emerald-500 hover:bg-emerald-600 font-bold", {"bg-gray-900 hover:bg-gray-900": articlesList.length < 4})} onClick={handleNextPage} disabled={articlesList.length < 4}>Next Page</button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : articlesList && articlesList.length > 0 ? (
                <div className="grid grid-rows-1 grid-cols-2 md:grid-rows-2 gap-2 md:gap-6 w-full my-4">
                    {articlesList.map((article: { id: Key | null | undefined; attributes: any }) => (
                        <Suspense key={article.id} fallback={<CardSkeleton/>}>
                            <Card key={article.id} article={article}/>
                        </Suspense>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-800/50 rounded-lg p-4 w-full md:w-1/3 min-h-32 h-full">
                    <span className="font-bold">No items found !!</span>
                </div>
            )}

    </div>
    );
}