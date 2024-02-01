'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Urls {
  _id: string,
  date: string,
  origUrl: string,
  shortUrl: string,
  clicks: number
}

export default function MainPage() {
    const [origUrl, setOrigUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [rateLimitExceeded, setRateLimitExceeded] = useState<boolean>(false);
    const [rateLimitMessage, setRateLimitMessage] = useState<string>('');
    const [urls, setUrls] = useState<Urls[]>([])
    const [clicked, setClicked] = useState<boolean>(false)
    const [newId, setNewId] = useState<string>("")
    const [editId,setEditId] = useState<string>("")

    const {data: session} = useSession()
    const email= session?.user?.email

  useEffect(() => {
    const checkIsRegistered = async () => {
      const data = await axios.post("http://localhost:3333/users/register", {email})
      console.log(data)
    }

    const getAllUrls = async () => {
      const data = await axios.post("http://localhost:3333/allurl",{email})
      console.log(data.data);
      
      setUrls(data.data)
    }

    checkIsRegistered()
    getAllUrls()
  },[])


  const isValidUrl = (url: string) => {
    const pattern = /^(http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrigUrl(event.target.value);
  };

  // complete this edit function 
  const handleEdit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const data = await fetch(`http://localhost:3333/${editId}`,{
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({newId})
      })
      setClicked(false)
      console.log(data);
    } catch (error) {
      console.log(error);
    }

  }

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
        body: JSON.stringify({ origUrl,email }),
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
        
        setShortUrl(data.shortUrl);
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
    <div className="flex flex-col justify-center items-center text-white">
    <form onSubmit={handleSubmit} className="w-full max-sm:w-2/3 ">
    <div className="flex flex-col items-center mb-4 pt-10">
      <input
        type="text"
        id="original-url"
        value={origUrl}
        onChange={handleInputChange}
        placeholder="Enter the URL"
        className="w-1/3 max-sm:w-full mt-1 p-2 rounded border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
      />
    </div>
    <div className="flex items-center justify-center">
    <button type="submit" className="btn btn-success  py-2">Shorten URL</button>
    </div>
  </form>
    {loading && <span className="loading loading-infinity loading-lg text-gray-200"></span>}
    {rateLimitExceeded && (
      <>
     <div className="mt-4 max-sm:text-lg lg:text-xl">
       {rateLimitMessage}
     </div>
     <div className=' max-sm:w-72'>
      <img src="https://media.tenor.com/JZJ7ukQTO24AAAAC/come-back-tomorrow-were-closed.gif" alt="Come back Tomorrow" />
     </div>
     </>
    )}
    {shortUrl && (
     <div className="mt-4 flex flex-col md:flex-row md:items-center">
     <p className="text-lg font-medium">Shortened URL:</p>
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

<div className="flex flex-col items-center justify-center gap-4 py-10 sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto">
  {urls.map((url) => (
    <div key={url._id} className="bg-gray-100 w-full p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between gap-4">
      {!clicked ? (
         <a
         href={url.shortUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="text-blue-500 font-semibold underline break-all max-sm:text-sm"
       >
         {url.shortUrl}
       </a> 
      ) : (
       <form onSubmit={handleEdit}>
         <input type="text" value={url.shortUrl} 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewId(event.target.value)}/>
         <button
          type="submit"
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md p-2"
        >
          Done
        </button>
        <button
          onClick={() => {
            setClicked(false)
          }}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md p-2"
        >
          Cancel
        </button>
       </form>
      ) }
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md p-2"
          onClick={() => navigator.clipboard.writeText(url.shortUrl)}
        >
          <img src="copy.svg" alt="copy" width={20} height={20} />
        </button>
        <button
          onClick={() => {
            setClicked(true)
            setEditId(url._id)
          }}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md p-2"
        >
          <img src="edit.svg" alt="edit" width={20} height={20} />
        </button>
        <button
          // onClick={handleDelete}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md p-2"
        >
          <img src="delete.svg" alt="delete" width={20} height={20} />
        </button>
        <button
          // onClick={handleDelete}
          className="flex items-center justify-center hover:bg-gray-300 text-gray-700 font-semibold rounded-md p-2"
        >
           {url.clicks}
        </button>
      </div>
    </div>
  ))}
</div>

  </div>
  
  );
}
