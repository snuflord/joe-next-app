
import Link from "next/link";
import Markdown from "react-markdown";
import Image from "next/image";
import defaultImage from '@/public/tech_bg_next.jpeg';


export function Card({article}: {article: any}) {

    const data = article;

    const truncatedDescription =
    data.attributes.description.length > 100
      ? `${data.attributes.description.substring(0, 100)}...`
      : data.attributes.description;

    return (
        <Link href={`/articles/${data.id}`} className="group transition duration-300 bg-slate-800 rounded-lg p-4 md:hover:bg-gradient-to-r from-indigo-500 to-emerald-600 w-full min-h-32 h-full flex flex-col">

            <div className="flex flex-col md:flex-row justify-between">
                <h3 className="text-xs md:text-base font-bold mb-2 w-full md:max-w-[60%]">{data.attributes.title}</h3>
                <span className="text-xs md:text-base mb-2 font-bold underline-offset-2 text-emerald-500 group-hover:text-white group-hover:underline">Author: {data.attributes.associatedUsername}</span>
            </div>
            
            <Markdown className="text-xs md:text-base mb-2">{truncatedDescription}</Markdown>

            <span className="text-xs md:text-sm font-bold mt-auto">Updated: {new Date(data.attributes.updatedAt).toLocaleDateString("en-UK")}</span>
            
        </Link>
    )
}

// used on article page
export function SideCard({article}: {article: any}) {

    const data = article

    const truncatedDescription =
    data.attributes.description.length > 100
      ? `${data.attributes.description.substring(0, 100)}...`
      : data.attributes.description;

    return (
        <Link href={`/articles/${data.id}`} className="bg-gradient-to-r from-indigo-500 to-emerald-600 mb-3 rounded-lg p-3 min-h-30 md:hover:from-indigo-500/50">
            <div className="flex space-x-3">
                <div className="w-1/2">
                    <h3 className="font-bold mb-2">{data.attributes.title}</h3>
                    <Markdown className="text-sm">{truncatedDescription}</Markdown>
                </div>
                {data && data.attributes.media.data ? (
                        <div className="h-full w-1/2">
                            <Image
                                src={data.attributes.media.data[0].attributes.formats.thumbnail.url}
                                alt="API Image"
                                width={1200}
                                height={675}
                                className="rounded-lg md:w-full aspect-square object-cover"
                                priority={true}
                                placeholder="empty"
                            />
                        </div>
                        
                    ) : (
                        <div className="h-full w-1/2">
                            <Image
                                src={defaultImage}
                                alt="Default Image"
                                width={560}
                                height={620}
                                className="block rounded-lg md:w-full aspect-square object-cover"
                                priority={true}
                                placeholder="empty"
                            />
                        </div>
                    )}
            </div>
        </Link>
    )
}

export function SearchCard({article}: {article: any}) {

    const data = article;

    const truncatedDescription =
    data.attributes.description.length > 100
      ? `${data.attributes.description.substring(0, 100)}...`
      : data.attributes.description;

    return (
        <Link href={`/articles/${data.id}`} className="transition-colors duration-300 bg-indigo-900 rounded-lg p-3 md:p-5 min-h-30 md:hover:bg-indigo-950">

            <div className="flex space-x-3">
                <div className="w-1/2">
                    <h3 className="font-bold mb-2">{data.attributes.title}</h3>
                    <Markdown className="text-xs md:text-base">{truncatedDescription}</Markdown>
                </div>

                {data && data.attributes.media.data ? (
                <div className="h-full w-1/2">
                    <Image
                        src={data.attributes.media.data[0].attributes.url}
                        alt="API Image"
                        width={1200}
                        height={675}
                        className="rounded-lg md:w-full aspect-square object-cover"
                        priority={true}
                        placeholder="empty"
                    />
                </div>
            ) : (
                <div className="h-full w-1/2">
                    <Image
                        src={defaultImage}
                        alt="Default Image"
                        width={560}
                        height={620}
                        className="block rounded-lg md:w-full aspect-square object-cover"
                        priority={true}
                        placeholder="empty"
                    />
                </div>
            )}
            </div>
        </Link>
    )
}
