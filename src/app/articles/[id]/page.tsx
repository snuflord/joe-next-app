import { getArticle } from "@/app/lib/alldata";
import Image from "next/image";
import Markdown from 'react-markdown'
import defaultImage from '@/public/tech_bg_next.jpeg'
import EditButton from "@/app/components/articles/EditButton";
import Link from "next/link";

// params is article, which is the individual article returned to the card mapped in CardWrapper 
export default async function Page({ params }: { params: { id: string } }) {

    const json = await getArticle(params.id, true);

    const article = json.data.attributes;

    console.log(article)

    const propArticle = json.data;

    // const articleImg = json.data.attributes.media.data[0].attributes.url;
    // console.log(articleImg)

    return (
        <section className="px-2 md:px-0 container mx-auto">

            <div className="flex flex-col md:flex-row my-5">
                <div className="p-5 shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-lg w-full md:w-3/4">
                    <div className="space-y-2 md:space-y-0 flex flex-col md:flex-row justify-between">
                        <h1 className="text-lg underline underline-offset-8 md:text-4xl font-bold mb-2">{article.title}</h1>
                       
                       <div className=" md:space-x-2 flex flex-col md:flex-row md:items-center">
                            <span className="font-bold">Posted: {new Date(article.createdAt).toLocaleDateString("en-UK")}</span>
                            <span className="font-bold">Updated: {new Date(article.updatedAt).toLocaleDateString("en-UK")}</span>
                       </div>
                        
                    </div>

                    {/* <span className="block font-bold text-lg">Author: {article.owner.data.attributes.username}</span> */}
                    {article && article.associatedUsername ? <span className="font-bold text-lg mt-3 block">Author: {article.associatedUsername}</span> : <span className="font-bold text-lg mt-3 block">Author not found</span>}
                    
                    <p className="font-bold md:text-2xl mt-5">
                        
                    </p>
                    
                    {json && json.data.attributes.media.data ? (
                        <>
                            <Image
                                src={json.data.attributes.media.data[0].attributes.url}
                                alt="API Image"
                                width={1200}
                                height={675}
                                className="hidden md:block rounded-2xl mt-5 md:w-full"
                                priority={true}
                                placeholder="empty"
                            />
                            <Image
                                src={json.data.attributes.media.data[0].attributes.formats.small.url}
                                alt="API Image"
                                width={1200}
                                height={675}
                                className="block md:hidden rounded-2xl mt-5 md:w-full"
                                priority={true}
                                placeholder="empty"
                            />
                        </>
                        
                    ) : (
                        <Image
                            src={defaultImage}
                            alt="Default Image"
                            width={560}
                            height={620}
                            className="block rounded-2xl mt-5 md:w-full"
                            priority={true}
                            placeholder="empty"
                        />
                    )}

                    <Markdown className="mt-5 space-y-4 md:text-2xl">
                        {article.description}
                    </Markdown>


                    <EditButton article={propArticle}/>
                    
                </div>
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-600 h-fit w-full md:w-1/4 px-5 md:ml-5 rounded-lg sticky top-5">
                    <div className="flex flex-col space-y-3 my-5">
                        <div className="border-slate-900 border-4 border-solid rounded-lg w-full">
                            <Link className="w-full h-full block p-6" href="">Item one</Link>
                        </div>
                    </div>
                </div>
            </div> 
        </section>
    )
}