"use client"
import { signIn, useSession } from "next-auth/react"
import MainPage from "./MainPage"

export default function HomePage() {
    const {data: session} = useSession()
    
    if(session && session.user) {
        return (
            <main>
                <MainPage />
            </main>
        )
    }
    return(
        <div className="py-20">
            <div className="hero">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary" onClick={() => signIn("google")}>Get Started</button>
    </div>
  </div>
</div>
        </div>
    )
}