import React from "react";
import styles from "./Input.module.scss";
const Input = (props) => {
  return (
    <div>
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={styles.Input}
        onChange={props.onChange}
        value={props.value}
        id={props.id}
      />
    </div>
  );
};

export default Input;
