'use client'

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton({ session }: {session: Session | null}) {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()


    const handleSignin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/auth/callback`
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
            <button className="text-xs text-gray-400 " onClick={handleSignin}>Login</button>
            :
            <button className="text-xs text-gray-400 " onClick={handleSignout}>Logout</button>
            }
        </>
        
      )
}