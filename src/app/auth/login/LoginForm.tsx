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

function LoginForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event) => {
      console.log(event);
      if (event === "SIGNED_IN") {
        router.replace("/home");
      }
    }).data.subscription;

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <div>
      <Auth
        supabaseClient={supabase}
        view="sign_in"
        appearance={{ theme: ThemeSupa }}
        theme="light"
        showLinks={false}
        providers={[]}
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(LoginForm), { ssr: false });
