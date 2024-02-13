// import Link from "next/link"
// import clsx from "clsx"

// export default function Pagination( {search}: {search: string}, {page}: {page: number}  ) {
//   return (
//     <div>
//         <div className='flex space-x-6'>
//             <Link
//               href={{
//                 pathname: '/movies',
//                 query: {
//                   ...(search ? { search } : {}),
//                   page: page > 1 ? page - 1 : 1
//                 }
//               }}
//               className={clsx(
//                 'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
//                 page <= 1 && 'pointer-events-none opacity-50'
//               )}
//             >
//               Previous
//             </Link>
//             <Link
//               href={{
//                 pathname: '/movies',
//                 query: {
//                   ...(search ? { search } : {}),
//                   page: page + 1
//                 }
//               }}
//               className='rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800'
//             >
//               Next
//             </Link>
//         </div>
//     </div>
//   )
// }
