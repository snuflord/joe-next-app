import Link from "next/link"

export default function Navigation() {

    return (
        <div className="z-10 my-5 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <Link href='/dashboard' className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <code className="font-mono font-bold">DASHBOARD</code>
          </Link>

          <div className="space-x-3">
              <Link className="p-4 bg-emerald-500 rounded-lg" href='/articles/create'>Post</Link>
              <Link className="p-4 bg-emerald-500 rounded-lg" href='/'>Home</Link>
          </div>
          
        </div>
    )
}