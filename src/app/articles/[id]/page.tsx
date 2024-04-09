import { getArticle } from "@/app/lib/alldata";
import Image from "next/image";
import Markdown from 'react-markdown'
import defaultImage from '@/public/tech_bg_next.jpeg'
import EditButton from "@/app/components/articles/EditButton";

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

            <div>
                <div className="mt-5 p-5 shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-lg w-full md:w-2/3 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between">
                        <h1 className="text-lg underline underline-offset-8 md:text-4xl font-bold mb-2">{article.title}</h1>
                       
                       <div className="space-x-2 flex items-center">
                            <span className="mt-auto font-bold">Posted: {new Date(article.createdAt).toLocaleDateString("en-UK")}</span>
                            <span className="mt-auto font-bold">Updated: {new Date(article.updatedAt).toLocaleDateString("en-UK")}</span>
                       </div>
                        
                    </div>

                    {/* <span className="block font-bold text-lg">Author: {article.owner.data.attributes.username}</span> */}
                    {article && article.associatedUsername ? <span className="font-bold text-lg underline">Author: {article.associatedUsername}</span> : <span className="font-bold text-lg underline">Author not found</span>}
                    
                    <p className="font-bold md:text-2xl mt-5">
                        {article.description}
                    </p>

                    <Markdown className="mt-5">
                        {article.body}
                    </Markdown>

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
                                src={json.data.attributes.media.data[0].attributes.formats.medium.url}
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

                    <EditButton article={propArticle}/>
                    
                </div>
            </div> 
        </section>
    )
}