import React, { useState } from "react";
import { useHistory } from "react-router";
import styles from "./Register.module.scss";
import Input from "../../components/Small/Input/Input";
import Button from "../../components/Small/Button/Button";
import { Link } from "react-router-dom";
import Paragraph from "../../components/Small/Paragraph/Paragraph";
import FormContainer from "../../components/Small/FormContainer/FormContainer";
import axios from "axios";
const Register = () => {
  const history = useHistory();
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");

  const handleKorisnickoIme = (event) => {
    setKorisnickoIme(event.target.value);
  };

  const handleIme = (event) => {
    setIme(event.target.value);
  };

  const handlePrezime = (event) => {
    setPrezime(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleLozinka = (event) => {
    setLozinka(event.target.value);
  };

  const handleRegistracija = () => {
    const data = {
      korisnickoIme,
      ime,
      prezime,
      email,
      lozinka,
    };
    const registracija = async () => {
      await axios
        .post(`/korisnik/registracija`, data)
        .then((res) => {
          console.log("res", res.data);

          setKorisnickoIme("");
          setIme("");
          setPrezime("");
          setEmail("");
          setLozinka("");
          alert("Registracija uspješna!");
          history.push("/");
        })
        .catch((err) => {
          console.log({ message: err.message });
          alert(
            "Došlo je do pogreške, pokušajte se registrirati s drugim korisničkim imenom!"
          );
        });
    };
    registracija();
  };

  return (
    <div className={styles.RegisterBackground}>
      <FormContainer>
        <h1 className={styles.Title}>Registracija</h1>
        <Input
          name="Korisnicko ime"
          type="text"
          placeholder="Korisničko ime"
          onChange={handleKorisnickoIme}
          value={korisnickoIme}
        />
        <Input
          name="Ime"
          type="text"
          placeholder="Ime"
          onChange={handleIme}
          value={ime}
        />
        <Input
          name="Prezime"
          type="text"
          placeholder="Prezime"
          onChange={handlePrezime}
          value={prezime}
        />
        <Input
          name="E-mail"
          type="text"
          placeholder="E-mail"
          onChange={handleEmail}
          value={email}
        />
        <Input
          name="Lozinka"
          type="password"
          placeholder="Lozinka"
          onChange={handleLozinka}
          value={lozinka}
        />

        <Button name="Registracija" onClick={handleRegistracija} />

        <Link to="/prijava">
          <Paragraph>Već imaš korisnički račun? Prijavi se!</Paragraph>
        </Link>

        <Link to="/">
          <Paragraph>
            Ne želim se registrirati, osnovni pristup mi je dovoljan!
          </Paragraph>
        </Link>
      </FormContainer>
    </div>
  );
};

export default Register;
