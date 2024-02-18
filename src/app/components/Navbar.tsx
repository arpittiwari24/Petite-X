'use client'
import Link from "next/link";
import SigninButton from "./SignInButton";
import { signOut, useSession } from "next-auth/react";
import { usePremiumContext } from "../contexts/Premium";


export default function Navbar () {
    const {data: session} = useSession()
    const premium = usePremiumContext()
    
    return (
        <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown text-2xl">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            {session && session?.user ? (
                <></>
            ): (
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
              <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            {/* <li><Link href="/blogs">Blogs</Link></li> */}
            </ul>
            )}
          </div>
          <Link href="/" className="btn btn-ghost max-sm:text-xl text-3xl">TidyL</Link>
          {/* {!premium === false ? (
            <span className="btn btn-ghost btn-sm max-sm:text-0.5xl text-xl px-2">Premium</span>
          ) : (
            <></>
          )} */}
        </div>
        <div className="navbar-center hidden lg:flex">
          {session && session?.user ? (
            <></>
          ) : (
            <ul className="menu menu-horizontal px-1 text-lg">
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            {/* <li><Link href="/blogs">Blogs</Link></li> */}
          </ul>
          )}
        </div>
        <div className="navbar-end overflow-hidden">
          {session && session?.user ? (
            <div className="w-10 rounded-lg">
              <div className="dropdown">
            <div tabIndex={0} role="button" className="">
             <img alt={session.user.name || ""} src={session.user.image || ""} className="rounded-full"/>
            </div>
            
          </div>
          </div>
          ): (
            <SigninButton />
          )}  
        </div>
      </div>
    )
}