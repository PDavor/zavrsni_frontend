import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navigation from "../../components/Navigation/Navigation";
import ContentWraperRow from "../../components/ContentWraoperRow/ContentWraperRow";
import Footer from "../../components/Footer/Footer";
import Content from "../../components/Content/Content";
import FormContainer from "../../components/Small/FormContainer/FormContainer";
import Input from "../../components/Small/Input/Input";
import Button from "../../components/Small/Button/Button";
import axios from "axios";
import { useHistory } from "react-router";

const CreateCourse = () => {
  const history = useHistory();
  const auth = JSON.parse(sessionStorage.getItem("user"));
  if (auth === null) {
    history.push("/prijava");
  } else {
    if (auth.uloga !== "administrator") {
      history.push("/");
    }
  }
  const [tecaj, setTecaj] = useState();
  const [predavac, setPredavac] = useState("");
  const [korisnici, setKorisnici] = useState([]);
  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");
  const [certifikatSlika, setCertifikatSlika] = useState("");

  const handleNaziv = (event) => {
    setNaziv(event.target.value);
  };
  const handlePredavac = (event) => {
    setPredavac(event.target.value);
  };
  const handleOpis = (event) => {
    setOpis(event.target.value);
  };
  const handleCertifikatSlika = (event) => {
    setCertifikatSlika(event.target.value);
  };
  const handleKreirajTecaj = () => {
    const data = {
      naziv,
      opis,
      predavac,
      certifikatSlika,
    };
    const kreirajTecaj = async () => {
      await axios
        .post(`/tecaj/dodaj`, data)
        .then((res) => {
          setTecaj(res.data);
          console.log("res", res.data);
          const korisnikDodajPredaje = async () => {
            await axios
              .patch(`/korisnik/dodajPredaje`, {
                _id: res.data.predavac,
                predaje: res.data._id,
              })
              .then((res) => {
                console.log("res data", res.data);
                setNaziv("");
                setOpis("");
                setPredavac("");
                setCertifikatSlika("");
              })
              .catch((err) => {
                console.log({ data });
                console.log({ message: err.message });
              });
          };
          korisnikDodajPredaje();
          alert("Tečaj dodaj uspješno");
        })
        .catch((err) => {
          console.log({ message: err.message });
        });
    };
    kreirajTecaj();
  };

  //dohvati korisnike za dropdown predavaca
  useEffect(() => {
    const fetchUsers = async () => {
      axios
        .get(`/korisnik/dohvatiStudente`)
        .then((res) => {
          setKorisnici(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Navigation />
      <ContentWraperRow>
        <Sidebar />
        <Content align>
          <FormContainer>
            <h1 className="Title">Dodaj tečaj</h1>
            <label htmlFor="Korisnicko ime">Korisničko ime predavača:</label>

            <select
              id="Korisnicko ime"
              name="Korisnicko ime"
              onChange={handlePredavac}
              value={predavac}
            >
              <option value="0">Odaberi predavača</option>
              {korisnici.map((korisnik) => (
                <option value={korisnik._id} key={korisnik._id}>
                  {korisnik.korisnickoIme}
                </option>
              ))}
            </select>

            <label htmlFor="Naziv tecaja">Naziv tečaja:</label>
            <Input
              name="Naziv tecaja"
              type="text"
              placeholder="Naziv tečaja"
              onChange={handleNaziv}
              value={naziv}
            />
            <label htmlFor="Opis tecaja">Opis tečaja:</label>
            <Input
              name="Opis tecaja"
              type="text"
              placeholder="Opis tečaja"
              onChange={handleOpis}
              value={opis}
            />
            <label htmlFor="Slika certifikata tecaja">
              Slika certifikata tečaja:
            </label>
            <Input
              name="Slika certifikata tecaja"
              type="text"
              placeholder="Slika certifikata tečaja"
              onChange={handleCertifikatSlika}
              value={certifikatSlika}
            />
            <Button name="Kreiraj tečaj" onClick={handleKreirajTecaj} />
          </FormContainer>
        </Content>
      </ContentWraperRow>
      <Footer />
    </>
  );
};

export default CreateCourse;
