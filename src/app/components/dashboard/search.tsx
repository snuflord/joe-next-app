// 'use client'; // This is a Client Component, which means you can use event listeners and hooks.

// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import { useDebouncedCallback } from 'use-debounce';

// export default function Search({ placeholder }: { placeholder: string }) {


//   const searchParams = useSearchParams();
//   const {replace} = useRouter();
//   const pathname = usePathname();

//   // This function will wrap the contents of handleSearch, and only run the code after a specific time once the user has stopped typing (300ms).
//   const handleSearch = useDebouncedCallback((term) => {

//     console.log(`Searching...${term}`)


//     const params = new URLSearchParams(searchParams);

//     params.set('page', '1');

//     // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
//     if(term) {

//       // setting the value of the query to the input term
//       params.set('query', term);
//     } else {
//       params.delete('query');
//     }
//     // replace(${pathname}?${params.toString()}) updates the URL with the user's search data. For example, /dashboard/invoices?query=tobe if the user searches for "Tobe".
//     replace(`${pathname}?${params.toString()}`);
//   }, 300);

  
//   return (
//     <div className="relative flex flex-1 flex-shrink-0">
//       <label htmlFor="search" className="sr-only">
//         Search
//       </label>
//       <input
//         className="peer text-black block w-full md:w-1/3 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" 
//         placeholder={placeholder} onChange={(e) => {handleSearch(e.target.value)}}
//         defaultValue={searchParams.get('query')?.toString()}/>

//       <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-500 peer-focus:text-emerald-500" />
//     </div>
//   );
// }

'use client'


import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function Search({ placeholder }: { placeholder: string }) {

    const [term, setTerm] = useState('')
    const router = useRouter()

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        router.push(`/events/search?term=${term}`)
        setTerm('')
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input className='text-black block w-full md:w-1/3 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500' type='text' value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Search Events'/>
        </form>
        <button className='hover:text-blue-400 p-4 bg-emerald-500 mt-5 rounded-lg' onClick={handleSubmit} type="submit" value="Search">Search</button>
    </div>
  )
}