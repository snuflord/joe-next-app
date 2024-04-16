'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from "clsx";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navigation() {
  const { user, logoutUser } = useAuth();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState(user);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    setCurrentUser(user);

    const handleScroll = () => {
      setIsAtTop(window.pageYOffset === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [user]);

  const links = [
    { name: 'Search', href: '/articles/search' },
  ];

  return (
    <div id="nav" className={clsx(" md:h-auto w-full sticky top-0 z-10", {"bg-gray-900": !isAtTop})}>
      <div className="py-8 container mx-auto w-full flex flex-col md:flex-row justify-between font-mono text-sm">
        <div className="w-full md:w-auto mb-3 md:mb-0 flex items-center justify-between">
          <Link href='/dashboard' className="dark:border-neutral-800 rounded-lg dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl p-4">
            <code className="font-mono font-bold">DASHBOARD</code>
          </Link>
          {currentUser ? <span className="bg-blue-500 md:bg-transparent p-4 rounded-lg font-bold underline underline-offset-4 ml-2">Hello, {currentUser.username}!</span> : <span className="font-bold underline underline-offset-4 ml-2">No user</span>}
        </div>
        <div className="w-full my-3 md:my-0 md:w-auto space-y-3 md:space-y-0 md:space-x-3 group flex flex-col md:flex-row justify-start">
          {currentUser ? <Link
            className={clsx('p-4 bg-indigo-500/50 hover:bg-indigo-500/30 rounded-lg transition-all duration-300', {'text-purple-500': pathname === '/articles/create',})}
            href='/articles/create'>Post</Link> : <></>}
          {links.map((link) => (
            <Link key={link.name} href={link.href} className={clsx('p-4 bg-indigo-500/50 hover:bg-indigo-500/30 rounded-lg transition-all duration-300', {'text-purple-500': pathname === link.href,})}>
              <span className="inline-block">{link.name}</span>
            </Link>
          ))}
          {!currentUser || currentUser == null ? <Link className='p-4 bg-indigo-500/50 hover:bg-indigo-500/30 rounded-lg transition-all duration-300' key='logout' href="/login">Login</Link> : <></>}
          {currentUser ? <Link onClick={() => logoutUser()} className='p-4 bg-indigo-500/50 hover:bg-indigo-500/30 rounded-lg transition-all duration-300' key='logout' href="/">Logout</Link> : <></>}
        </div>
      </div>
    </div>
  );
}
