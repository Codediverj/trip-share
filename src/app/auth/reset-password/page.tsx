"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./resetpw.module.scss";

const ResetPasswordPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "USER_UPDATED") {
        router.replace("/home");
      }
    });
  }, [router, supabase.auth]);

  return (
    <div className={styles.resetpw}>
      <Auth
        supabaseClient={supabase}
        view="update_password"
        appearance={{ theme: ThemeSupa }}
        theme="light"
        showLinks={false}
        providers={[]}
      />
    </div>
  );
};

export default ResetPasswordPage;
