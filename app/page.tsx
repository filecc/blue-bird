import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { cookies } from 'next/headers'
import AuthButtonServer from './components/auth-button-server'
import { redirect } from 'next/navigation'
import AuthButton from './components/auth-button'

export default async function Home() {
  const supabase = createServerComponentClient({cookies})


  const { data: { session }} = await supabase.auth.getSession()

  if(!session) {
    redirect('/login')
  }

  const { data: tweets} = await supabase.from('tweets').select()

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <AuthButtonServer />
     <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </main>
  )
}
