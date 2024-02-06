'use client'

import axios from "axios"
import { signIn, useSession } from "next-auth/react"
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Pricing from "./Pricing"


 export default function Page() {

    return (
    <Pricing />
  )
}
