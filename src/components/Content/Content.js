import React from "react";
import styles from "./Content.module.scss";
const Content = (props) => {
  const view = props.align;
  if (view) {
    return <div className={styles.ContentCenter}>{props.children}</div>;
  } else {
    return <div className={styles.Content}>{props.children}</div>;
  }
};

export default Content;
