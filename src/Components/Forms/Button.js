import React from "react";
import styles from "./Button.module.css";

// eslint-disable-next-line react/prop-types
const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
