"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import dynamic from "next/dynamic";
import styles from "./forgotpw.module.scss";

const ForgotPasswordPage = () => {
  const supabase = createClientComponentClient();

  return (
    <div className={styles.forgetpw}>
      <Auth
        supabaseClient={supabase}
        view="forgotten_password"
        appearance={{ theme: ThemeSupa }}
        theme="light"
        showLinks={false}
        providers={[]}
        redirectTo={`${location.origin}/auth/reset-callback`}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(ForgotPasswordPage), { ssr: false });
