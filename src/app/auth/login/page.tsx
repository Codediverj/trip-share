"use client";
import Link from "next/link";
import LoginForm from "./LoginForm";
import styles from "./login.module.scss";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className={styles.intro}>
      <div className="login_content">
        <div className="logo_block">
          <Image src="/static/logo_icon.svg" alt="logo icon" width="52" height="52" />
          <h1>TripShare</h1>
        </div>

        <div className="login">
          <LoginForm />
        </div>
        <div className="signup_wrap">
          {`Don't have account?`}

          <Link className="signup_button" href="/auth/signup">
            Create a new account
          </Link>
        </div>

        <div className="signup_wrap">
          {`Forgot Password?`}

          <Link className="signup_button" href="/auth/forgot-password">
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
