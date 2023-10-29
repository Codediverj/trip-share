"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import dynamic from "next/dynamic";

const ForgotPasswordPage = () => {
  const supabase = createClientComponentClient();

  return (
    <Auth
      supabaseClient={supabase}
      view="forgotten_password"
      appearance={{ theme: ThemeSupa }}
      theme="light"
      showLinks={false}
      providers={[]}
      redirectTo={`${location.origin}/auth/reset-callback`}
    />
  );
};

export default dynamic(() => Promise.resolve(ForgotPasswordPage), { ssr: false });
