'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation';
import clsx from "clsx";

export default function Navigation() {

  const pathname = usePathname();

  const links = [
    { name: 'Post', href: '/articles/create', },
    { name: 'Search', href: '/dashboard/search', },
    { name: 'Home', href: '/', },
  ];

    return (
        <div className="z-10 my-5 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <Link href='/dashboard' className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <code className="font-mono font-bold">DASHBOARD</code>
          </Link>
          

          <div className="space-x-3 group">
              {/* <Link className="p-4 bg-emerald-500 hover:bg-emerald-400 rounded-lg" href='/articles/create'>Post</Link>
              <Link className="p-4 bg-emerald-500 rounded-lg" href='/articles/create'>Search</Link>
              <Link className="p-4 bg-emerald-500 rounded-lg" href='/'>Home</Link> */}

            {links.map((link) => {
                    // const LinkIcon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={clsx(
                        'p-4 bg-emerald-500 hover:bg-emerald-400 rounded-lg',
                        {
                          'text-red-500': pathname === link.href,
                        },
                      )}
                      >

                      {/* <LinkIcon className="w-6" /> */}
                      <span className="hidden md:inline-block">{link.name}</span>
                    </Link>
                );
              })}
          </div>
          
        </div>
    )
}