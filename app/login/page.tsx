import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthButton from "@/app/components/auth-button";


export default async function Login() {
    const supabase = createServerComponentClient({ cookies })

    const { data: { session }} = await supabase.auth.getSession()

  if(session) {
    redirect('/')
  }
  

  return <AuthButton session={session} />
}