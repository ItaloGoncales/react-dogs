import React from "react";
import { Navigate, Route, Routes } from "react-router";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginResetPassword from "./LoginResetPassword";
import { UserContext } from "../../UserContext";
import styles from "./Login.module.css";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login) <Navigate to="/conta" />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="esqueci" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginResetPassword />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
