"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dynamic from "next/dynamic";
import { useEffect } from "react";

//Component
import GeneratedTravlerCode from "@/components/GenerateTravelerCode";
import ExtractUsernameFromEmail from "@/components/ExtractUsernameFromEmail";
import { useRouter } from "next/navigation";

async function SignupForm() {
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      console.log(event);
    });
  }, [supabase]);

  return (
    <div>
      <Auth
        supabaseClient={supabase}
        view="sign_up"
        appearance={{ theme: ThemeSupa }}
        theme="default"
        showLinks={false}
        providers={[]}
        redirectTo={`${location.origin}/auth/signup-callback`}
      />
    </div>
  );
}

//client loading
export default dynamic(() => Promise.resolve(SignupForm), { ssr: false });
