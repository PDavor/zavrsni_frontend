import React from "react";
import styles from "./ContentWraperRow.module.scss";
const ContentWraperRow = (props) => {
  return <div className={styles.ContentWrapperRow}>{props.children}</div>;
};

export default ContentWraperRow;
