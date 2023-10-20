import AuthForm from "./AuthForm";
import styles from "./login.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <h1>LOGIN</h1>
      <div>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
