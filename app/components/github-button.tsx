"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function GitHubButton() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`
      },
    });
  };

  return (
    <button onClick={handleSignIn} className="hover:bg-gray-800 px-8 py-4 rounded-xl flex items-center gap-2 bg-slate-950 text-white cursor-pointer">
      <Image
        src="/github-mark-white.png"
        alt="GitHub logo"
        width={24}
        height={24}
      />
      Sign-in with GitHub
    </button>
  );
}