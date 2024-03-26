
import Link from "next/link"


export function Card({article}: {article: any}) {

    const data = article;

    const truncatedDescription =
    data.attributes.description.length > 100
      ? `${data.attributes.description.substring(0, 150)}...`
      : data.attributes.description;

    return (
        <Link href={`/articles/${data.id}`} className="group transition duration-300 bg-slate-800 rounded-lg p-4 hover:bg-gradient-to-r from-indigo-500 to-emerald-600 w-full min-h-32 h-full">
            <div className="flex justify-between">
                <h3 className="font-bold underline underline-offset-2 mb-2 max-w-[70%]">{data.attributes.title}</h3>
                <Link href='/dashboard' className="font-bold underline-offset-2 text-emerald-500 group-hover:text-white group-hover:underline">Author: {data.attributes.associatedUsername}</Link>
            </div>
            
            <p className="">{truncatedDescription}</p>
            
        </Link>
    )
}

