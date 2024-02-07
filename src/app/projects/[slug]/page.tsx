'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Urls {
  _id: string,
  date: string,
  origUrl: string,
  shortUrl: string,
  clicks: number
}

export default function Page({ params }: { params: { slug: string } }) {

  const [origUrl, setOrigUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const [rateLimitExceeded, setRateLimitExceeded] = useState<boolean>(false);
  const [rateLimitMessage, setRateLimitMessage] = useState<string>('');
  const [urls, setUrls] = useState<Urls[]>([])
  const [effectExecuted, setEffectExecuted] = useState<boolean>(false)

  const {data: session} = useSession()
  const email= session?.user?.email

  const project = params.slug

  useEffect (() => {
    const getAllUrls = async () => {
   if(!effectExecuted) {
      try {
      setLoading(true)
      const data = await fetch("http://localhost:3333/allurl", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({email, project})
      })
      const response = await data.json()
      setUrls(response)
      setLoading(false)
      setEffectExecuted(true)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
   }

    const myTimeout = setTimeout(() => {
      getAllUrls()
    }, 2000)

   return () => clearTimeout(myTimeout);
  }, [effectExecuted, email, project])

  const isValidUrl = (url: string) => {
    const pattern = /^(http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrigUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
  
    if (!isValidUrl(origUrl)) {
      console.error('Invalid URL format');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3333/api/short', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ origUrl,email, project }),
      });
  
      if (response.status === 429) {
        // Rate limit exceeded
      const rateLimitMessage = await response.text();
      setRateLimitExceeded(true);
      setRateLimitMessage(rateLimitMessage);
      setLoading(false)
      } else if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEffectExecuted(false)
        setLoading(false);
      } else {
        console.error('Failed to shorten URL');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    return (
    <main className="py-10">
      <div className="flex items-center justify-center">
      <div className="text-3xl text-gray-900 font-semibold">{project}</div>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-sm:w-2/3 ">
      <div className="flex flex-row items-center justify-center mb-4 pt-10 gap-2">
        <input
          type="text"
          id="original-url"
          value={origUrl}
          onChange={handleInputChange}
          placeholder="Add new Url"
          className="w-1/3 max-sm:w-full mt-1 p-2 rounded border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
        />
         <button type="submit" className="btn btn-success  py-2 text-xl">+</button>
      </div>
    </form>
    {/* <div>
    {shortUrl && (
     <div className="mt-4 flex flex-col md:flex-row md:items-center">
     <p className="text-lg font-medium text-gray-900">Shortened URL:</p>
     <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-gray-800 bg-slate-300 underline mt-2 md:mt-0 md:ml-2">
       {shortUrl}
     </a>
     <button
       onClick={() => navigator.clipboard.writeText(shortUrl)}
       className="btn btn-secondary mt-2 md:mt-0 md:ml-2 flex items-center justify-center p-1 w-20"
     >  Copy
     </button>
    <div className='px-2'><button className='btn btn-info' onClick={() => window.location.reload()}>Reload</button></div>
   </div>   
    )}
    </div> */}
    <div className="flex flex-col items-center justify-center gap-4 py-10 sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto">
      {urls.map((url) => (
          <div key={url._id} className="bg-gray-100 w-full p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between gap-4">
             <a
             href={url.shortUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="text-blue-500 font-semibold underline break-all max-sm:text-sm"
           >
             {url.shortUrl}
           </a> 
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md p-2"
              onClick={() => navigator.clipboard.writeText(url.shortUrl)}
            >
              <img src="copy.svg" alt="copy" width={20} height={20} />
            </button>
            <button
              // onClick={handleDelete}
              className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md p-2"
            >
              <img src="delete.svg" alt="delete" width={20} height={20} />
            </button>
            <button
              className="flex items-center justify-center hover:bg-gray-300 text-gray-700 font-semibold rounded-md p-2"
            >
               {url.clicks}
            </button>
          </div>
        </div>
      ))}
      {loading && <span className="loading loading-spinner text-info"></span>}
    </div>
    </main>
    )
  }