"use client";
import LoginForm from "./LoginForm";
import styles from "./login.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push("/auth/signup");
  };

  return (
    <div className={styles.intro}>
      <div className="login_content">
        <div className="logo_block">
          <Image src="/logo_icon.svg" alt="logo icon" width="52" height="52" />
          <h1>TripShare</h1>
        </div>

        <div className="login">
          <LoginForm />
        </div>
        <div className="signup_wrap">
          {`Don't have account?`}

          <button className="signup_button" onClick={handleSignupClick}>
            Create a new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
