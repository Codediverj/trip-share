"use client";
import SignupForm from "./SignupForm";
import styles from "./signup.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/auth/login");
  };

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
          <button className="signup_button" onClick={handleSignInClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
