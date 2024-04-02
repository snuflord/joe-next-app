'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation';
import clsx from "clsx";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navigation() {

  const { user, logoutUser } = useAuth();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    
    setCurrentUser(user);
    
  }, [user]);

  const links = [
    { name: 'Search', href: '/dashboard/search' },
  ];

  return (
    <div className="z-10 my-8 w-full items-center flex justify-between font-mono text-sm ">
      <div>
        <Link href='/dashboard' className="dark:border-neutral-800 rounded-lg dark:bg-zinc-800/30 dark:from-inherit   lg:rounded-xl p-4">
          <code className="font-mono font-bold">DASHBOARD</code>
        </Link>
        {currentUser ? <span className="font-bold underline underline-offset-4 ml-2">Hello, {currentUser.username}!</span> : <span className="font-bold underline underline-offset-4 ml-2">No user</span>}
      </div>
      <div className="space-x-3 group">
        {currentUser ? <Link
          className={clsx('p-4 bg-emerald-500 hover:bg-emerald-400 rounded-lg',
            {
              'text-purple-500': pathname === '/articles/create',
            },)}
          href='/articles/create'>Post</Link> : <></>
        }
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'p-4 bg-emerald-500 hover:bg-emerald-400 rounded-lg',
                {
                  'text-purple-500': pathname === link.href,
                },
              )}
            >
              <span className="hidden md:inline-block">{link.name}</span>
            </Link>
          );
        })}
        {!currentUser || currentUser == null ? <Link className='p-4 bg-emerald-500 hover:bg-emerald-400 rounded-lg' key='logout' href="/login">Login</Link> : <></>}
        {currentUser ? <Link onClick={() => logoutUser()} className='p-4 bg-emerald-500 hover:bg-emerald-400 rounded-lg' key='logout' href="/">Logout</Link> : <></>}
      </div>
    </div>
  )
}
