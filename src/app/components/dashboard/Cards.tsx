

import { getArticles, } from "@/app/lib/data"
import { Key } from "react"
import { CardSkeleton } from "@/app/ui/skeletons"
import { Suspense } from "react"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"


export async function Card({article}: {article: any}) {

    const data = article
    return (
        <Link href={`/articles/${data.id}`} className="transition duration-300 bg-emerald-500 rounded-lg p-4 hover:bg-indigo-500">
            <h3>{data.attributes.title}</h3>
            <p>{data.attributes.description}</p>
        </Link>
    )
}

