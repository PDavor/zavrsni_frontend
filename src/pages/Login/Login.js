import React, { useState } from "react";
import styles from "./Login.module.scss";
import Input from "../../components/Small/Input/Input";
import Button from "../../components/Small/Button/Button";
import { Link } from "react-router-dom";
import Paragraph from "../../components/Small/Paragraph/Paragraph";
import FormContainer from "../../components/Small/FormContainer/FormContainer";
import axios from "axios";
import { useHistory } from "react-router";
const Login = () => {
  const history = useHistory();
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [lozinka, setLozinka] = useState();

  const handleKorisnickoIme = (event) => {
    setKorisnickoIme(event.target.value);
  };

  const handleLozinka = (event) => {
    setLozinka(event.target.value);
  };

  const logIn = async (event) => {
    event.preventDefault();
    const data = {
      korisnickoIme,
      lozinka,
    };
    axios
      .post("/korisnik/prijava", data)
      .then((res) => {
        if (res.data) {
          sessionStorage.setItem("user", JSON.stringify(res.data));
          history.push("/");
        } else {
          alert("Podaci nisu ispravi, pokušajte ponovno!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.LoginBackground}>
      <FormContainer>
        <h1 className={styles.Title}>Prijava</h1>
        <Input
          name="Korisnicko ime"
          type="text"
          placeholder="Korisničko ime"
          onChange={handleKorisnickoIme}
        />
        <Input
          name="Lozinka"
          type="password"
          placeholder="Lozinka"
          onChange={handleLozinka}
        />

        <Button name="Prijava" onClick={logIn} />

        <Link to="/registracija">
          <Paragraph>Kreiraj novi korisnički račun!</Paragraph>
        </Link>

        <Link to="/">
          <Paragraph>
            Ne želim se prijaviti, osnovni pristup mi je dovoljan!
          </Paragraph>
        </Link>
      </FormContainer>
    </div>
  );
};

export default Login;
