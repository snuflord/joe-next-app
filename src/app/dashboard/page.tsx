// Dashboard

import LargeCard from "../components/dashboard/LargeCard";
import { getArticles } from "../lib/alldata";
import { Key, Suspense } from "react";
import { Card } from "../components/dashboard/Cards";
import { CardSkeleton } from "../ui/skeletons";
import clsx from "clsx";

export default async function Dashboard () {

    const page = 1

    const articleList = await getArticles({page});

    return (
      <main className="flex flex-col items-start px-2 md:px-0 container mx-auto">
        

        <LargeCard />

        <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 w-full my-4">
            
            {articleList ? articleList.map((article: { id: Key | null | undefined; attributes: any }) => (
                <Suspense key={article.id} fallback={<CardSkeleton/>}>
                    <Card key={article.id} article={article}/>
                </Suspense>
            )) : 
                <div className="bg-slate-800 rounded-lg p-4 hover:bg-gradient-to-r from-indigo-500 to-emerald-600 w-full min-h-32 h-full">
                  <span className="font-bold">No Items found!</span>
                </div>
            }
            
        </div>
  
      </main>
    );
  }

