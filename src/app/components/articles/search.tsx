'use client'

import { useState } from 'react'
import { getFilteredArticles } from '@/app/lib/alldata'
import { Key, Suspense } from 'react'
import { CardSkeleton } from '@/app/ui/skeletons'
import { SearchCard } from '../dashboard/Cards'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from "react-icons/fa";

export default function Search() {

    const [term, setTerm] = useState('')
    const [articles, setArticles] = useState([])
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // trim method removes whitespace
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
                <input className='peer text-black block text-xl font-bold w-full pl-10  rounded-md border border-gray-200 py-4 px-6 outline-none placeholder-gray-500 ' type='text' value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Search articles' />

                <FaSearch className="absolute font-bold text-3xl -translate-y-10 left-3 h-[18px] w-[18px] text-indigo-500 peer-focus:text-emerald-500" />

                <button className='p-4 transition-colors duration-300 bg-emerald-500 md:hover:bg-emerald-500/80 mt-5 rounded-lg md:min-w-96' type="submit">Search</button>
            </form>

            <div>
                <div className="grid grid-cols-1 auto-rows-auto md:grid-cols-3 w-full gap-2 md:gap-3 my-5">
                {articles ? articles.map((article: { id: Key | null | undefined; attributes: any }) => (
                                
                    <Suspense key={article.id} fallback={<CardSkeleton/>}>
                        <SearchCard key={article.id} article={article}/>
                    </Suspense>

                    )) : 
                    <p>No articles!</p>
                    }
                </div>
            </div>
        </div>
    )
}
