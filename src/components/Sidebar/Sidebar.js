import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.scss";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
  const [ refresh ,setRefresh] = useState(props.refresh);
  const [lekcije, setLekcije] = useState([]);
  const [nazivTecaja, setNazivTecaja] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const dohvatiLekcije = async () => {
      await axios
        .get(`/lekcija/${id}`)
        .then((res) => {
          setLekcije(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiLekcije();

    const dohvatiNazivTecaja = async () => {
      await axios
        .get(`/tecaj/dohvatiPoId/${id}`)
        .then((res) => {
          setNazivTecaja(res.data.naziv);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiNazivTecaja();
    setRefresh(props.refresh);
  }, [id, props.refresh]);
  console.log(refresh);
  return (
    <aside className={styles.SidebarContainer}>
      <h2 className={styles.H2}>{nazivTecaja}</h2>
      <ul className={styles.Ul}>
        {lekcije.map((lekcija) => (
          <Link to={`/tecaj/${id}/${lekcija._id}`} key={lekcija._id}>
            <li className={styles.Li} key={lekcija._id}>
              {lekcija.naziv}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
