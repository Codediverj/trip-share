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

function AuthForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data: existUser } = await supabase
          .from("user")
          .select("*")
          .eq("user_id", user?.id)
          .single();
        // const response = await supabase.from("user").select("*").eq("user_id", user?.id).single();
        // const data = response.data;

        if (existUser) {
          // sign in
          console.log("User already exists:", user);
        } else {
          // sign up
          console.log(user);
          supabase
            .from("User")
            .insert({
              user_id: user?.id,
              created_at: new Date(),
              profile_image: "/profile_default_image.svg",
              nickname: ExtractUsernameFromEmail(user?.email || ""),
              email: user?.email,
              traveler_code: GeneratedTravlerCode(),
            })
            .select()
            .single()
            .then(({ data, error }) => {
              console.log(data);
              if (error) {
                console.log(error);
              }
            });
        }

        router.replace("/home");
      }
    });
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

export default dynamic(() => Promise.resolve(AuthForm), { ssr: false });
