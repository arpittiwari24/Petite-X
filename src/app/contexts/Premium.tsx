'use client'
import axios from "axios"
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export const PremiumContext = createContext({});

export const usePremiumContext = () => useContext(PremiumContext);

interface Props {
    children: ReactNode;
  }

const IsPremiumContextProvider = (props: Props) => {

    const {data: session} = useSession()
    const email = session?.user?.email
    const [premium, setPremium] = useState<boolean>(false)
    const api= process.env.NEXT_PUBLIC_API

        useEffect(() => {

            const checkIsRegistered = async () => {
                const data = await axios.post("http://localhost:3333/users/register", {email})
                console.log(data)
              }

            const fetchPremium = async () => {
                try {
                const data = await axios.post(`http://localhost:3333/payments/check-customer`,{
                    email
                },
                {
                    withCredentials: false,
                  } )  
                if(data.data.body.status === "subscribed") {
                    setPremium(true)
                } else {
                    setPremium(false)
                }             
                } catch (error) {
                    console.log(error)
                }
            }
    
            const delay = 1000; //  in milliseconds
            const timeoutId = setTimeout(() => {
              checkIsRegistered()
              fetchPremium();
            }, delay);
        
            // Clear the timeout if the component unmounts before the delay
            return () => clearTimeout(timeoutId);
        }, [email])

    return (
        <PremiumContext.Provider value={{ premium}}>
           {props.children}
        </PremiumContext.Provider>
    );
}

export default IsPremiumContextProvider