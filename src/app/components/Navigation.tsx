'use client'

// import Link from "next/link";
import { usePathname } from 'next/navigation';
import { RxDashboard } from "react-icons/rx";
import clsx from "clsx";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";


export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // const menuItems = [
  //   { name: 'Search', href: '/articles/search' },
  //   { name: 'Post', href: '/articles/create' },
  // ];

 

  return (
    <>

{/* <nav id="nav" className={clsx(" md:h-auto w-full sticky top-0 z-10", {"bg-gray-900": !isAtTop})}>
      <div className="py-8 container mx-auto w-full flex flex-col md:flex-row justify-between font-mono text-sm">
        <div className="w-full md:w-auto mb-3 md:mb-0 flex items-center justify-between">
          <Link href='/dashboard' className="dark:border-neutral-800 rounded-lg dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl p-4">
            <code className="font-mono font-bold">DASHBOARD</code>
          </Link>
          {currentUser ? <Link href={`/dashboard/account`} className="bg-blue-500 md:bg-transparent p-4 rounded-lg font-bold underline underline-offset-4 ml-2">Hello, {currentUser.username}!</Link> : <span className="font-bold underline underline-offset-4 ml-2">No user</span>}
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
    </nav> */}

    <Navbar className={clsx("md:mb-5 md:h-auto w-full sticky bg-slate-900 md:py-3", {"bg-slate-950": !isAtTop})} onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        <NavbarItem>
          <Link href='/dashboard' className="dark:border-neutral-800 rounded-lg dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl p-2 md:p-4">

            <RxDashboard className='text-2xl'/>
            <code className="hidden md:block font-mono font-bold pl-2">DASHBOARD</code>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 md:w-full" justify="center">
        
        {currentUser ? <NavbarItem><Link href={`/dashboard/account`} className={clsx('px-4 py-2 bg-indigo-500/50 hover:bg-indigo-500/30 rounded-lg transition-all duration-300 text-white', {'text-emerald-500': pathname === '/dashboard/account',})}>My Account</Link></NavbarItem> : <NavbarItem><span className="font-bold underline underline-offset-4 ml-2">No user</span></NavbarItem>}

        {currentUser ? <NavbarItem><Link className={clsx('px-4 py-2 bg-indigo-500/50 hover:bg-indigo-500/30 rounded-lg transition-all duration-300 text-white', {'text-emerald-500': pathname === '/articles/create',})}
        href='/articles/create'>Post</Link></NavbarItem> : <></>}
        
        <NavbarItem>
          <Link className={clsx('px-4 py-2 bg-indigo-500/50 hover:bg-indigo-500/30 rounded-lg transition-all duration-300 text-white', {'text-emerald-500': pathname === '/articles/search',})} href="/articles/search">
            Search
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">

        {!currentUser || currentUser == null ? <NavbarItem><Link className='px-4 py-2 bg-indigo-500/50 hover:bg-indigo-500/30 rounded-lg transition-all duration-300 text-white' key='logout' href="/login">Login</Link></NavbarItem> : <></>}

        {currentUser ? <NavbarItem><Link onClick={() => logoutUser()} className='px-4 py-2 bg-indigo-500/50 hover:bg-indigo-500/30 rounded-lg transition-all duration-300 text-white' key='logout' href="/">Logout</Link></NavbarItem> : <></>}

      </NavbarContent>

      <NavbarMenu className='dark'>
        
        <NavbarMenuItem>
          {currentUser ? <Link href={`/dashboard/account`}>My Account</Link> : <></>}
        </NavbarMenuItem>
        <NavbarMenuItem>
          {currentUser ? <Link href={`/articles/create`}>Post</Link> : <></>}
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/articles/search">Search</Link>
        </NavbarMenuItem>

        
        
      </NavbarMenu>
    </Navbar>
    </>

  );
}
