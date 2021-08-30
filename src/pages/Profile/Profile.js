import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import Navigation from "../../components/Navigation/Navigation";
import ContainerCol from "../../components/ContainerCol/ContainerCol";
import Footer from "../../components/Footer/Footer";
import { useHistory } from "react-router";
import axios from "axios";
const Profile = () => {
  const id = JSON.parse(sessionStorage.getItem("user"));
  if (id === null) {
    history.push("/prijava");
  }
  const history = useHistory();
  const [korisnik, setKorisnik] = useState();
  const [certifikati, setCertifikati] = useState();
  //----------------------------------------------------dohvati korisnik-----------------------------------------//
  useEffect(() => {
    const dohvatiKorisnika = async () => {
      id && console.log("id", id._id);
      await axios
        .get(`/korisnik/dohvatiProfil/${id._id}`)
        .then((res) => {
          setKorisnik(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiKorisnika();
  }, []);

  //----------------------------------------------------dohvati certifikate-----------------------------------------//
  useEffect(() => {
    const dohvatiCertifikate = async () => {
      id && console.log("id", id._id);
      await axios
        .get(`/certifikat/poKorisniku/${id._id}`)
        .then((res) => {
          setCertifikati(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiCertifikate();
  }, []);
  return (
    <ContainerCol>
      <Navigation />
      <div className={styles.ProfileCard}>
        <img
          src="./images/profile.png"
          alt="Slika profila"
          className={styles.Picture}
        />
        <div className={styles.Content}>
          <h3>
            {korisnik && korisnik.ime} {korisnik && korisnik.prezime}
          </h3>
          <h6 className={styles.Cert}>Certifikati</h6>
          <ul className={styles.Ul}>
            {certifikati &&
              certifikati.map((cert) => (
                <li className={styles.Li} key={cert._id}>
                  {cert.naziv}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Footer />
    </ContainerCol>
  );
};

export default Profile;
