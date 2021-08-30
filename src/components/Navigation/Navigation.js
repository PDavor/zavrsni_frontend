import React from "react";
import styles from "./Navigation.module.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
const Menu = () => {
  const history = useHistory();
  const pogled = () => {
    const auth = JSON.parse(sessionStorage.getItem("user"));
    if (auth === null) {
      return (
        <ul className={styles.Ul}>
          <Link to="/">
            <li className={styles.Li}>Naslovna</li>
          </Link>
          <Link to="/prijava">
            <li className={styles.Li}>Prijava</li>
          </Link>
          <Link to="/registracija">
            <li className={styles.Li}>Registracija</li>
          </Link>
        </ul>
      );
    } else {
      if (auth.uloga !== "administrator") {
        return (
          <ul className={styles.Ul}>
            <Link to="/">
              <li className={styles.Li}>Naslovna</li>
            </Link>
            <Link to="/profil">
              <li className={styles.Li}>Profil</li>
            </Link>
            <li
              className={styles.Li}
              onClick={() => {
                sessionStorage.removeItem("user");
                history.push("/");
              }}
            >
              Odjava
            </li>
          </ul>
        );
      } else {
        //ako je administrator dodaj i kreiraj tecaj
        return (
          <ul className={styles.Ul}>
            <Link to="/">
              <li className={styles.Li}>Naslovna</li>
            </Link>
            <Link to="/profil">
              <li className={styles.Li}>Profil</li>
            </Link>
            <Link to="/kreirajTecaj">
              <li className={styles.Li}>Tečaj administracija</li>
            </Link>
            <li
              className={styles.Li}
              onClick={() => {
                sessionStorage.removeItem("user");
                history.push("/");
              }}
            >
              Odjava
            </li>
          </ul>
        );
      }
    }
  };

  return <nav className={styles.Nav}>{pogled()}</nav>;
};

export default Menu;
