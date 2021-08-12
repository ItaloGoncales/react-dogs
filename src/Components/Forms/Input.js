import React from "react";
import styles from "./Input.module.css";

// eslint-disable-next-line react/prop-types
const Input = ({ label, type, value, name, error, onChange, onBlur }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={styles.input}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      ></input>
      {error && <p className={styles.erro}>{error}</p>}
    </div>
  );
};

export default Input;
