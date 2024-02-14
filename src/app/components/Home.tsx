"use client"
import {useSession } from "next-auth/react"
import Pricing from "../pricing/Pricing"
import Features from "./Features"
import ContactUs from "./Contact"
import Hero from "./Hero"
import AllProjects from "./ProjectsPage"
import Footer from "./Footer"

export default function HomePage() {
    const {data: session} = useSession()
    
    if(session && session.user) {
        return (
            <main>
                <AllProjects />
            </main>
        )
    }
    return(
    <div>
     <div>
     <Hero />
     </div>
     <div className="py-8 pt-16">
     <Features />
     </div>
     <div className="py-10">
     <Pricing />
     </div>
     <div className="py-10">
     <ContactUs />
     </div>
     <div>
        <Footer />
     </div>
  </div>
    )
}