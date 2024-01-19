'use client'
import Link from "next/link";
import SigninButton from "./SignInButton";
import { useSession } from "next-auth/react";


export default function Navbar () {
    const {data: session} = useSession()
    return (
        <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown text-2xl">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/pricing">Pricing</Link></li>
            {session && session.user ? (
                <li><Link href="/profile">Profile</Link></li>
            ): (
                <li></li>
            )}
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">Petite-X</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl">
            <li><Link href="/pricing">Pricing</Link></li>
            {session && session.user ? (
                <li><Link href="/profile">Profile</Link></li>
            ): (
                <li></li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <SigninButton />
        </div>
      </div>
    )
}