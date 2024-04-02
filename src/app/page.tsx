import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">

      <div className="bg-gradient-to-r from-indigo-500 to-emerald-600 w-full md:w-1/3 h-96 rounded-2xl shadow-lg flex items-center justify-center">
        <div className="flex flex-col">
          <h1 className="text-lg md:text:2xl lg:text-5xl mb-5 font-bold">welcome</h1>
          <div className="flex flex-col space-y-2">
            <Link className="dark:border-neutral-800 text-center rounded-lg dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl p-4" href='/login'>
              <code className="font-mono font-bold">Log In</code>
            </Link>
            <Link className="dark:border-neutral-800 text-center rounded-lg dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl p-4" href='/dashboard'>
              <code className="font-mono font-bold">Skip to dash</code>
            </Link>
          </div>
        </div>
      </div>
      
    </main>
  );
}
