// Dashboard

import LargeCard from "../components/dashboard/LargeCard";
import { getArticles } from "../lib/alldata";
import { Key, Suspense } from "react";
import { Card } from "../components/dashboard/Cards";
import { CardSkeleton } from "../ui/skeletons";
import Link from "next/link";
import clsx from "clsx";

export default async function Dashboard ({
        searchParams
    }: {
        searchParams: { [key: string]: string | string[] | undefined }
    }) {

    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined

    const articleList = await getArticles( { page, limit, query: search } );

    return (
      <main className="flex min-h-screen flex-col items-start justify-between px-2 md:px-0 container mx-auto">
        

        <LargeCard />

        <div className='flex space-x-6'>
            <Link
              href={{
                pathname: '/movies',
                query: {
                  ...(search ? { search } : {}),
                  page: page > 1 ? page - 1 : 1
                }
              }}
              className={clsx(
                'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
                page <= 1 && 'pointer-events-none opacity-50'
              )}
            >
              Previous
            </Link>
            <Link
              href={{
                pathname: '/movies',
                query: {
                  ...(search ? { search } : {}),
                  page: page + 1
                }
              }}
              className='rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800'
            >
              Next
            </Link>
          </div>

        <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 w-full my-4">
            
            {articleList ? articleList.map((article: { id: Key | null | undefined; attributes: any }) => (
                <Suspense key={article.id} fallback={<CardSkeleton/>}>
                    <Card key={article.id} article={article}/>
                </Suspense>
            )) : 
                <p>FALLBACK TEXT</p>
            }
            
        </div>
  
      </main>
    );
  }

