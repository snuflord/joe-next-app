'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation';
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";


export default function Navigation() {

  const { user, isAuthenticated, checkUserLoggedIn } = useAuth();

  const pathname = usePathname();

  const links = [
    { name: 'Post', href: '/articles/create', },
    { name: 'Search', href: '/dashboard/search', },
    { name: 'Register', href: '/dashboard/register' },
    { name: 'Home', href: '/', },
  ];

    return (

        <div className="z-10 my-8 w-full items-center flex justify-between font-mono text-sm ">

          <div>
          <Link href='/dashboard' className="dark:border-neutral-800 rounded-lg dark:bg-zinc-800/30 dark:from-inherit   lg:rounded-xl p-4">
            <code className="font-mono font-bold">DASHBOARD</code>
          </Link>
          
          {user ? <span className="font-bold underline underline-offset-4 ml-2">Hello, {user.username}!</span> : <span className="font-bold underline underline-offset-4 ml-2">No user</span>}
          </div>
          

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
              {!user ? <Link className='p-4 bg-emerald-500 hover:bg-emerald-400 rounded-lg' key='logout' href="/dashboard/login">Login</Link> : <></>}

              {user ? <Link className='p-4 bg-emerald-500 hover:bg-emerald-400 rounded-lg' key='logout' href="/dashboard" >Logout</Link> : <></>}
          </div>
        </div>


        
    )
}