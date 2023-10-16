import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { cookies } from 'next/headers'

export default async function Home() {
  const supabase = createServerComponentClient({cookies})
  const { data: tweets} = await supabase.from('tweets').select()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </main>
  )
}
