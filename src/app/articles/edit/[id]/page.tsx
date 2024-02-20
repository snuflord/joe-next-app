

import { getArticle } from "@/app/lib/alldata";
import EditEvent from "@/app/components/articles/EditEvent";

// EDIT EVENT PAGE

export default async function Page({ params }: { params: { id: string } }) {

    const json = await getArticle(params.id);

    console.log(json)

    const article = json
    
    return (
      
        <section className="px-2 md:px-0 container mx-auto">

            <div>
                <div className="mt-2 p-5 shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-lg w-full md:w-1/2">
                   
                    <EditEvent article={article}/>
                
                </div>
            </div> 
        </section>
    )
  }
  