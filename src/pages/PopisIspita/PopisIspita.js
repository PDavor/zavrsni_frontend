import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Editor from "../../components/Small/Editor/Editor";
import Navigation from "../../components/Navigation/Navigation";
import ContentWraperRow from "../../components/ContentWraoperRow/ContentWraperRow";
import Footer from "../../components/Footer/Footer";
import Content from "../../components/Content/Content";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Small/Input/Input.js";
import Button from "../../components/Small/Button/Button";
import FormContainer from "../../components/Small/FormContainer/FormContainer";
import styles from "./PopisIspita.module.scss";
import Paragraph from "../../components/Small/Paragraph/Paragraph";
const PopisIspita = () => {
  const korisnik = JSON.parse(sessionStorage.getItem("user"));

  const history = useHistory();
  const { id, ispit } = useParams();
  //----------------------------------auth--------------------------------------------------//
  const auth = JSON.parse(sessionStorage.getItem("user"));
  if (auth === null) {
    history.push("/");
  } else {
    if (auth.predaje !== id) {
      history.push("/");
    }
  }
  const [ispiti, setIspiti] = useState([]); //lista ispita
  const [pitanja, setPitanja] = useState([]); //lista pitanja za pojedini ispit
  const [maksBodova, setMaksBodova] = useState(0);
  const [ostvarenoBodova, setOstvarenoBodova] = useState(0);
  const [trenutniIspit, setTrenutniIspit] = useState();
  const [ispitStatus, setIspitStatus] = useState();
  const [tecaj, setTecaj] = useState();
  const handleStatus = (event) => {
    setIspitStatus(event.target.value);
  };

  //-------------------------------------------------------------gumb za slanje | ocjenjivanje ispita ----------------------------------------//
  const handlePosalji = () => {
    const posalji = async () => {
      await axios
        .patch(`/ispit/ocjeni`, {
          _id: ispit,
          ukupnoBodova: maksBodova,
          ostvarenoBodova: ostvarenoBodova,
          status: ispitStatus,
        })
        .then((res) => {
          console.log(res.data);
          //posalji u certifikat
          const posaljiCertifikat = async () => {
            await axios
              .post(`/certifikat/dodaj`, {
                tecajId: tecaj._id,
                korisnikId: trenutniIspit.student,
                naziv: tecaj.naziv,
                slika: tecaj.certifikat,
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          };
          if (ispitStatus === "polozen") {
            posaljiCertifikat();
          }

          alert("Ispit ocjenjen!");
          history.push(`/tecaj/${id}/ispitiAdministracija`);
          const dohvatiIspite = async () => {
            await axios
              .get(`/ispit/dohvatiNeispravljene/${id}`)
              .then((res) => {
                setIspiti(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          };
          dohvatiIspite();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    posalji();
  };
  //-----------------------------------------------------klik gumba za svako pitanje---------------------------------------//
  const staviOstvareneBodove = (index) => {
    let newArr = [...pitanja];
    const ostvareno = document.getElementById(index).value;
    newArr[index].ostvareniBodovi = parseInt(ostvareno);
    setOstvarenoBodova((prevState) => prevState + parseInt(ostvareno));
    setPitanja(newArr);
    document.getElementById(index).disabled = true;
  };

  //----------------------------------------------------------------dohvati podatke o tecaju za certifikat-------------------------------------//
  useEffect(() => {
    const dohvatiTecaj = async () => {
      await axios
        .get(`/tecaj/dohvatiPoId/${id}`)
        .then((res) => {
          setTecaj(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiTecaj();
  }, []);

  //--------------------------------------------dohvati ispite na pocetku---------------------------------------------------//
  useEffect(() => {
    const dohvatiIspite = async () => {
      await axios
        .get(`/ispit/dohvatiNeispravljene/${id}`)
        .then((res) => {
          setIspiti(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiIspite();
  }, []);

  //--------------------------------------------dohvati pitanja za pojedini ispit---------------------------------------------------//
  useEffect(() => {
    const dohvatiPitanja = async () => {
      await axios
        .get(`/rjesenoPitanje/dohvatiPoIspitu/${ispit}`)
        .then((res) => {
          setPitanja(res.data);
          res.data.map((dat) =>
            setMaksBodova((prevState) => prevState + dat.maksBodova)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiPitanja();
  }, [ispit]);
  //-------------------------------------------------dohvati trenutni ispit--------------------------------------------------------------//
  useEffect(() => {
    const dohvatiTrenutniIspis = async () => {
      await axios
        .get(`/ispit/dohvatiPoId/${ispit}`)
        .then((res) => {
          setTrenutniIspit(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiTrenutniIspis();
  }, [ispit]);
  return (
    <>
      <Navigation />
      <ContentWraperRow>
        <div className={styles.Container}>
          {typeof ispit === "undefined" ? (
            //prikaz za popis za ispravljanje
            ispiti &&
            ispiti.map((stavka, index) => (
              <FormContainer key={stavka._id}>
                <Link
                  to={`/tecaj/${id}/ispitiAdministracija/${stavka._id}`}
                  key={stavka._id}
                >
                  <Button name={`Ispit za ispraviti broj: ${index + 1}`} />
                </Link>
              </FormContainer>
            ))
          ) : (
            //prikaz za pojedini ispit
            <div>
              {pitanja &&
                pitanja.map((stavka, index) => (
                  <FormContainer key={stavka._id}>
                    <h3 className={styles.Naziv}>{stavka.naziv}</h3>
                    <h4>Odgovori studenta:</h4>
                    {stavka.odgovori.map((odgovor) => (
                      <Paragraph>{odgovor}</Paragraph>
                    ))}
                    <div className={styles.Bodovi}>
                      <h4 className={styles.MaksBodova}></h4>
                      <Input
                        id={index}
                        name="Ostvareno bodova"
                        type="number"
                        placeholder="Ostvareno bodova"
                      />
                      <Paragraph>od mogućih {stavka.maksBodova}</Paragraph>
                    </div>
                    <Button
                      name="Ocjeni pitanje"
                      onClick={() => staviOstvareneBodove(index)}
                    />
                    <hr style={{ width: "100%" }} />
                  </FormContainer>
                ))}
              <FormContainer>
                <Paragraph>Maksimalno mogućih bodova: {maksBodova}</Paragraph>
                <Paragraph>Ostvareno bodova: {ostvarenoBodova}</Paragraph>
                <form onChange={handleStatus}>
                  <div className={styles.Bodovi}>
                    <Input
                      type="radio"
                      value="polozen"
                      id="polozen"
                      name="prolazPad"
                    />
                    <label htmlFor="prolaz">Prolaz</label>
                  </div>
                  <div className={styles.Bodovi}>
                    <Input
                      type="radio"
                      value="nePolozen"
                      id="nePolozen"
                      name="prolazPad"
                    />
                    <label htmlFor="pad">Pad</label>
                  </div>
                </form>
                <Button name="Ocjeni ispit" onClick={handlePosalji} />
              </FormContainer>
            </div>
          )}
        </div>
      </ContentWraperRow>
      <Footer />
    </>
  );
};

export default PopisIspita;
