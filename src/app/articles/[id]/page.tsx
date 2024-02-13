import { getArticle } from "@/app/lib/data"
import Navigation from "@/app/components/Navigation";
import Image from "next/image";
import Markdown from 'react-markdown'
import defaultImage from '@/public/tech_bg_next.jpeg'


// params is article, which is the individual article returned to the card mapped in CardWrapper 
export default async function Page({ params }: { params: { id: string } }) {

    const json = await getArticle(params.id);

    const article = json.data.attributes;

    console.log(json)

    // const articleImg = json.data.attributes.media.data;
    // console.log(articleImg);

    return (
        <section className="px-2 md:px-0 container mx-auto">

            <div>
                <div className="mt-2 p-5 shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-lg w-full md:w-1/2">
                    <div className="flex flex-col md:flex-row justify-between">
                        <h1 className="text-lg underline underline-offset-8 md:text-4xl font-bold mb-2">{article.title}</h1>
                        <span className="mt-auto font-bold">{new Date(article.date).toLocaleDateString("en-UK")}</span>
                    </div>
                    
                    <p className="font-bold md:text-2xl mt-5">
                        {article.description}
                    </p>

                    <Markdown className="mt-5">
                        {article.body}
                    </Markdown>
                   
                    

                    {/* <p>{json.data.attributes.media.data.attributes.id}</p> */}

                    
                    <Image src={defaultImage}
                    width={560}
                    height={620}
                    className="block rounded-2xl mt-5 md:w-full"
                    priority
                    alt="tech-bg" />

                </div>
            </div> 
        </section>
    )
  }