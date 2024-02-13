import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Projects {
    _id: string,
    name: string,
  }

const AllProjects = () => {
    const [projects, setProjects] = useState<Projects[]>([])
    const [name, setName] = useState<string>("")
    const [effectExecuted, setEffectExecuted] = useState<boolean>(false)
    const {data: session} = useSession()
    const email = session?.user?.email

    useEffect(() => {
        const getAllProjects = async () => {
            if(!effectExecuted) {
              const data = await axios.post("http://localhost:3333/projects/all",{email})
            console.log(data.data);
            
            setProjects(data.data)
            setEffectExecuted(true)
            }
          }
      getAllProjects()
    },[])

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      const data = await axios.post("http://localhost:3333/projects/new",{email,name})
      const button = document.getElementById("close") as HTMLFormElement | null;
      if(button) {
        button.click()
      }
      setEffectExecuted(false)
    }

    const openModal = () => {
      const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
      if (modal) {
        modal.showModal();
      }
    };
    
  return (
    <>
    <div className='flex items-center justify-center text-black py-6 gap-10'>
    <h1 className='text-4xl'>My Projects</h1>
    {/* Create a new project */}
    <button className="btn" onClick={openModal}>Create New</button>
    <dialog id="my_modal_3" className="modal">
    <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button id='close' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <form onSubmit={handleSubmit} className="shadow-md rounded-lg p-8 bg-white w-full max-w-md">
    <p className="text-2xl font-bold text-gray-700 mb-4">New project</p>
    <input type="text" placeholder="Enter project name" 
           value={name}
           onChange={(e) => setName(e.target.value)}
           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:ring-2" />
    <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
      + Create
    </button>
  </form>
  </div>
</dialog>
  </div>
    <div className='flex flex-row-reverse items-center justify-center gap-4 py-10'>
    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-2 items-center gap-4 lg:gap-8">

    {projects.map((project) => (

      <Link key={project._id} className="group flex flex-col h-full text-center rounded-lg bg-gray-300 p-4 sm:p-6 hover:bg-white/[.05] focus:outline-none focus:ring-1" href={`/${project.name}`}>
      <div className="mt-5 w-full h-full">
        <p className='text-xl text-black'>{project.name}</p> 
        <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-blue-600 ">
          <svg className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </Link>
      ))}
  </div>
    </div>
    </>
  )
}

export default AllProjects
