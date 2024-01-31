'use client'

import axios from "axios"
import { signIn, useSession } from "next-auth/react"
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


 function Pricing() {

  const {data: session} = useSession()
  const email = session?.user?.email || ""

    return (
    
<div className="overflow-hidden">
  <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
 
    <div className="mx-auto max-w-2xl mb-8 lg:mb-14 text-center">
      <h2 className="text-3xl lg:text-4xl text-gray-800 font-bold">
        Pricing Plans
      </h2>
    </div>
  

    <div className="relative xl:w-10/12 xl:mx-auto">
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div>
   
          <div className="p-4 relative z-10 bg-white border rounded-xl md:p-10 dark:bg-slate-900 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Standard</h3>

            <div className="mt-5">
              <span className="text-6xl font-bold text-gray-800 dark:text-gray-200">Free</span>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0">
            
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex space-x-3">
                  <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    Up to 5 Url  monthly
                  </span>
                </li>

                <li className="flex space-x-3">
                  <span className="h-5 w-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-gray-800">
                    <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    Analytics
                  </span>
                </li>

                <li className="flex space-x-3">
                  <span className="h-5 w-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-gray-800">
                    <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    Custom Url Editing
                  </span>
                </li>
              </ul>
           </div>

            <div className="mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0">
            <div>
                <p className="text-sm text-gray-500">Cancel anytime.</p>
                <p className="text-sm text-gray-500">No card required.</p>
              </div>
              {session && session.user ? (
                <div>
                  <div className="flex justify-end">
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Start</button>
              </div>
                </div>
              ) : (
                <div className="flex justify-end">
                <button type="button" onClick={() => signIn()} 
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">SignIn</button>
              </div>
              )}
            </div>
          </div>
        
        </div>

        <div>
   
          <div className="shadow-xl shadow-gray-200 p-5 relative z-10 bg-white border rounded-xl md:p-10 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Premium</h3>
            <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-white dark:text-gray-800">Most popular</span>

            <div className="mt-5">
              <span className="text-6xl font-bold text-gray-800 dark:text-gray-200">$10</span>
              <span className="ms-3 text-gray-500">USD / monthly</span>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0">
             
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex space-x-3">
                  <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    Unlimited Urls
                  </span>
                </li>

                <li className="flex space-x-3">
                  <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    Analytics
                  </span>
                </li>

                <li className="flex space-x-3">
                  <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    Custom Url Editing
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm text-gray-500">Cancel anytime.</p>
                <p className="text-sm text-gray-500">No card required.</p>
              </div>
            {session && session?.user ? (
              <form action="http://localhost:3333/payments/create-checkout-session" method="POST" className="flex justify-end">
                <input 
                type="hidden"
                name="email"
                value={email}
                />
                <button 
                type="submit"
                id="checkout-and-portal-button"
                 className="py-4 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Start</button>
              </form>
      ) : (
                <button 
                type="submit"
                id="checkout-and-portal-button"
                 className="py-4 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                 onClick={() => signIn()}>Start</button>
      )}
            </div>
          </div>
        
        </div>
      </div>
      

      <div className="hidden md:block absolute top-0 end-0 translate-y-16 translate-x-16">
        <svg className="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
          <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
          <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
        </svg>
      </div>
 


      <div className="hidden md:block absolute bottom-0 start-0 translate-y-16 -translate-x-16">
        <svg className="w-56 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
        </svg>
      </div>
  
    </div>

    <div className="mt-7 text-center">
      <p className="text-xs text-gray-400">
        Prices in USD. Taxes may apply.
      </p>
    </div>
  </div>
</div>
    )
}

interface SuccessDisplayProps {
  sessionId: string; // Explicitly define the type here
}


const SuccessDisplay = ({ sessionId }: SuccessDisplayProps) => {
  
  const handlesubmit = async () => {
    await axios.post("http://localhost:3333/payments/create-portal-session",jsonObject,{
      withCredentials: true
    })
  }
  
  const {data: session} = useSession()
  const email = session?.user?.email
  const jsonObject : object = {
    email: email,
    sessionId: sessionId
  }
  console.log(email);
  
  return (
    <section>
      <div className="product Box-root">
        <div className="description Box-root">
          <h3>Subscription successful!</h3>
        </div>
      </div>
      <form onSubmit={handlesubmit} >
        {/* <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        /> 
          <input
          type="hidden"
          id="email"
          name="email"
          value={email}
        />  */}
        <button id="checkout-and-portal-button" 
        type="submit"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >Click to return to home page</button>
      </form>
    </section>
  );
};

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Subscription() {
  let [message, setMessage] = useState<string>('');
  let [success, setSuccess] = useState<boolean>(false);
  let [sessionId, setSessionId] = useState<string>('');

  const query  = useSearchParams();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    if (query.get('success')) {
      setSuccess(true!)
    }
    
    if (query.get('session_id')) {
      setSessionId(query.get('session_id')!);
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Payment canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  if (!success && message === '') {
    return <Pricing />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}
