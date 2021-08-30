import React from "react";
import styles from "./ContainerCol.module.scss";
const ContainerCol = (props) => {
  return <div className={styles.Container}>{props.children}</div>;
};

export default ContainerCol;
