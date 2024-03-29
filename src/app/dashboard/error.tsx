'use client';

// The error.tsx file can be used to define a UI boundary for a route segment. It serves as a catch-all for unexpected errors and allows you to display a fallback UI to your users.

// this file is a child route of invoices, so any error will display this fallback UI.

// on using CLIENT AND SERVER components: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
 
import { useEffect } from 'react';
import Link from 'next/link';
 
// error: This object is an instance of JavaScript's native Error object.
export default function Error({error, reset,}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center">
      <h2 className="text-center text-white">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover
          () => reset()
        }
      >
        Try again
      </button>
      <Link className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400' href="/dashboard">Back to Dashboard</Link>
    </main>
  );
}