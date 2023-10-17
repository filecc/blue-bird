"use client";
import { useEffect } from "react";
import Likes from "./likes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {

    

    const channel = supabase
      .channel("realtime tweets")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: 'public',
          table: "tweets",
        },
        (payload: any) => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);
  return tweets.map((tweet) => (
    <div
      key={tweet.id}
      className="border border-gray-800 border-t-0 px-4 py-8 flex"
    >
      <div className="h-12 w-12">
        <Image
          className="rounded-full"
          src={tweet.author.avatar_url}
          width={48}
          height={48}
          alt="tweet user avatar"
        />
      </div>

      <div className="ml-4">
        <p>
            <span className="font-bold"> {tweet.author.name}</span>
            <span className="text-sm ml-2 text-gray-400"> {tweet.author.username}</span>
         
        </p>
        <p>{tweet.title}</p>
        <Likes tweet={tweet} />
      </div>
    </div>
  ));
}
