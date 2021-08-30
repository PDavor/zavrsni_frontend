import React from "react";
import styles from "./Card.module.scss";
import Button from "../../../components/Small/Button/Button";
import { Link } from "react-router-dom";
export const Card = (props) => {
  const auth = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className={styles.Container}>
      <h2 className={styles.h2}>{props.title}</h2>
      <p className={styles.Description}>{props.description}</p>
      <Link to={`/tecaj/${props.link}`}>
        <Button name={`Nauči ${props.title}`} />
      </Link>
      {auth !== null && (
        <Link to={`/tecaj/${props.link}/kviz`}>
          <Button name={`ISPIT ${props.title}`} />
        </Link>
      )}
      {auth !== null && auth.predaje === props.link && (
        <Link to={`/tecaj/${props.link}/ispitiAdministracija`}>
          <Button name={`ISPRAVLJANJE ISPITA`} />
        </Link>
      )}
    </div>
  );
};

export const SecondaryCard = (props) => {
  const auth = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className={styles.ContainerSecondary}>
      <h2 className={styles.h2}>{props.title}</h2>
      <p className={styles.Description}>{props.description}</p>
      <Link to={`/tecaj/${props.link}`}>
        <Button name={`Nauči ${props.title}`} />
      </Link>
      {auth !== null && (
        <Link to={`/tecaj/${props.link}/kviz`}>
          <Button name={`ISPIT ${props.title}`} />
        </Link>
      )}
      {auth !== null && auth.predaje === props.link && (
        <Link to={`/tecaj/${props.link}/ispitiAdministracija`}>
          <Button name={`ISPRAVLJANJE ISPITA`} />
        </Link>
      )}
    </div>
  );
};
