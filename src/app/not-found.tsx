import Link from 'next/link'
import { FaFaceDizzy } from "react-icons/fa6";
 
export default function NotFound() {
  return (
    <div className='w-full h-screen md:w-1/2 m-auto p-1 md:p-6 shadow-xl flex flex-col justify-center items-center'>
      
      <h2 className='font-bold text-2xl mb-3'>404 Not Found!</h2>
      <span className='flex space-x-2'><p>Could not find requested page</p><FaFaceDizzy className='text-2xl'/></span>
      <Link className='bg-emerald-500 rounded-lg p-4 mt-4 transition font-bold duration-100 hover:bg-emerald-500/50' href="/">Return Home</Link>

    </div>
  )
}