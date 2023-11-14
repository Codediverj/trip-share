"use client";
import SignupForm from "./SignupForm";
import styles from "./signup.module.scss";
import Image from "next/image";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className={styles.signup}>
      <div className="login_content">
        <div className="logo_block">
          <Image src="/static/logo_icon.svg" alt="logo icon" width="52" height="52" />
          <h1>TripShare</h1>
        </div>

        <div className="login">
          <h2>Create Account</h2>
          <SignupForm />
        </div>
        <div className="signup_wrap">
          {`Already have a account?`}

          <Link className="signup_button" href="/auth/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
