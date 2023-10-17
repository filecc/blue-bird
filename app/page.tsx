import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "@/app/components/auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./components/new-tweet";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: tweets } = await supabase
    .from("tweets")
    .select("*, profiles(*)")

  return (
    <>
      <NewTweet />
      <AuthButtonServer />
     {tweets?.map(tweet => (
      <div key={tweet.id}>
        <p>
          {tweet.profiles?.name} {tweet.profiles?.username}
        </p>
        <p>{tweet.title}</p>
      </div>
     ))}
    </>
  );
}