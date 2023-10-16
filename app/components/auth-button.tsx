'use client'

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton({ session }: {session: Session | null}) {
    const supabase = createClientComponentClient()
    const router = useRouter()


    const handleSignin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
       
      }

    const handleSignout = async () => {
        await supabase.auth.signOut()
       router.refresh()
    }

      return (
        <>
        {!session ? 
            <button onClick={handleSignin}>Login</button>
            :
            <button onClick={handleSignout}>Logout</button>
            }
        </>
        
      )
}