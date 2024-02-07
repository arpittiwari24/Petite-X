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
    const [premium, setPremium] = useState(false)
    // const [plan,setPlan] = useState("")

        useEffect(() => {
            const fetchPremium = async () => {
                try {
                const data = await axios.post("http://localhost:3333/payments/check-customer",{
                    email
                },
                {
                    withCredentials: false,
                  } )  
                if(data.data.success === true) {
                    // setPlan(data.data.planId)
                    // console.log(plan)
                    setPremium(true)
                } else {
                    setPremium(false)
                }             
                } catch (error) {
                    console.log(error)
                }
            }
    
            const delay = 800; //  in milliseconds
            const timeoutId = setTimeout(() => {
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