import { getArticle } from "@/app/lib/alldata";
import EditEvent from "@/app/components/articles/EditEvent";
import { Suspense } from "react";
import { EditSkeleton } from "@/app/ui/skeletons";

// EDIT EVENT PAGE

export default async function Page({ params }: { params: { id: string } }) {

    const json = await getArticle(params.id);

    console.log(json)

    const article = json
    
    return (
      
        <section className="px-2 md:px-0 container mx-auto">

            <div>
                <Suspense fallback={<EditSkeleton />}>
                   
                   <EditEvent article={article}/>
               
                </Suspense>
                
            </div> 
        </section>
    )
  }
  