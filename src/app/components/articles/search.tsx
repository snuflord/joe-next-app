'use client'

import { useState } from 'react'
import { getFilteredArticles } from '@/app/lib/alldata'
import { Key, Suspense } from 'react'
import { CardSkeleton } from '@/app/ui/skeletons'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Search({ placeholder }: { placeholder: string }) {

    const [term, setTerm] = useState('')
    const [articles, setArticles] = useState([])
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (term.trim().length === 0) {
          toast.error('You need to enter a search term');
          return;
      }
  
      try {
          const json = await getFilteredArticles({ query: { term } });
  
          if (json.data.length > 0) {
              setArticles(json.data);
              setTerm('');
          } else {
              toast.error('No articles found!');
          }
      } catch (error) {
          console.error('Error fetching articles:', error);
          toast.error('There are no articles that match your search term :(');
      }
  };

    return (
        <div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <form className='relative' onSubmit={handleSubmit}>
                <input className='text-black block text-1xl w-full md:w-1/3 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500' type='text' value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Search articles' />

                <MagnifyingGlassIcon className="absolute font-bold -translate-y-7 left-3 h-[18px] w-[18px] text-blue-500 peer-focus:text-red-500" />

                <button className='p-4 bg-emerald-500 mt-5 rounded-lg' type="submit">Search</button>
            </form>

            <div>

            <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 w-full md:w-2/3 gap-3 my-2">
            {articles ? articles.map((article: { id: Key | null | undefined; attributes: any }) => (

                              
                <Suspense key={article.id} fallback={<CardSkeleton/>}>
                  <span className='bg-slate-700 p-5 rounded-lg my-2 inline-block'>{article.attributes.title}</span>
                </Suspense>

                )) : 
                <p>No articles!</p>
                }
            </div>
            
            </div>
        </div>
    )
}
