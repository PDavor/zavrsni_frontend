import React from "react";
import styles from "./Button.module.scss";
const Button = (props) => {
  return (
    <button className={styles.Button} onClick={props.onClick}>
      {props.name}
    </button>
  );
};

export default Button;
