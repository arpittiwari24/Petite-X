import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Projects {
    _id: string,
    name: string,
  }

const Sidebar = () => {
    const [projects, setProjects] = useState<Projects[]>([])
    const [name, setName] = useState<string>("")
    const {data: session} = useSession()
    const email = session?.user?.email

    useEffect(() => {
        const getAllUrls = async () => {
            const data = await axios.post("http://localhost:3333/projects/all",{email})
            console.log(data.data);
            
            setProjects(data.data)
          }
      getAllUrls()
    },[])

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      const data = await axios.post("http://localhost:3333/projects/new",{email,name})
      console.log(data);
    }
  return (
    <div className='flex flex-col items-center justify-center'>
    <div className='flex items-center justify-center text-black'>
      <h1 className='text-4xl'>Your Projects</h1>
    </div>
    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-2 items-center gap-4 lg:gap-8">

    {projects.map((project) => (

      <Link key={project._id} className="group flex flex-col h-full text-center rounded-lg bg-gray-300 p-4 sm:p-6 hover:bg-white/[.05] focus:outline-none focus:ring-1" href={`/projects/${project.name}`}>
      <div className="mt-5 w-full h-full">
        <p className='text-xl text-black'>{project.name}</p> 
        <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-blue-600 ">
          <svg className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </Link>
      ))}
  </div>
      <div>
      <form onSubmit={handleSubmit}>
          <p className='text-xl text-black'>Create new project</p>
          <input type="text" placeholder='enter project name' 
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='btn btn-info text-xl'>+</button>
      </form>
      </div>
    </div>
  )
}

export default Sidebar
