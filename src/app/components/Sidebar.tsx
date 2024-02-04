import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Urls {
    _id: string,
    date: string,
    origUrl: string,
    shortUrl: string,
    clicks: number
  }
const Sidebar = () => {
    const [urls, setUrls] = useState<Urls[]>([])
    const {data: session} = useSession()
    const email = session?.user?.email

    useEffect(() => {
        const getAllUrls = async () => {
            const data = await axios.post("http://localhost:3333/allurl",{email})
            console.log(data.data);
            
            setUrls(data.data)
          }
      getAllUrls()
    },[])
  return (
    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-2 items-center gap-4 lg:gap-8">
    {/* Icon Block */}
    <Link className="group flex flex-col h-full text-center rounded-lg hover:bg-gray-100 p-4 sm:p-6 hover:bg-white/[.05] focus:outline-none focus:ring-1 " href="/contact">
      <svg className="w-9 h-9 text-gray-800 mx-auto " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-gray-800 ">Knowledgebase</h3>
        <p className="mt-1 text-gray-500">We're here to help with any questions or code.</p>
        <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-blue-600 ">
          Contact support
          <svg className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </Link>
    {/* End Icon Block */}

    {/* Icon Block */}
    <Link className="group flex flex-col h-full text-center rounded-lg hover:bg-gray-100 p-4 sm:p-6 hover:bg-white/[.05] focus:outline-none focus:ring-1 " href="/faq">
      <svg className="w-9 h-9 text-gray-800 mx-auto " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-gray-800 ">FAQ</h3>
        <p className="mt-1 text-gray-500">Search our FAQ for answers to anything you might ask.</p>
        <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-blue-600 ">
          Visit FAQ
          <svg className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </Link>
    {/* End Icon Block */}

    {/* Icon Block */}
   
    {/* End Icon Block */}
  </div>
  )
}

export default Sidebar