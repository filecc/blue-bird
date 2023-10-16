'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function AuthButton() {
    const supabase = createClientComponentClient()

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
       
    }

      return (
        <>
       
            <button onClick={handleSignin}>Login</button>
            
            <button onClick={handleSignout}>Logout</button>
        
        </>
        
      )
}