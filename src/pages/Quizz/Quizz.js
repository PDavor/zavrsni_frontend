import React, { useState, useEffect } from "react";
import styles from "./Quizz.module.scss";
import SidebarKviz from "../../components/Sidebar/SidebarKviz";
import Input from "../../components/Small/Input/Input";
import Button from "../../components/Small/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router";
import axios from "axios";
import { useHistory } from "react-router";
const Quizz = () => {
  const auth = JSON.parse(sessionStorage.getItem("user"));
  if (auth === null) {
    history.push("/prijava");
  }
  const history = useHistory();
  const { pitanje, id } = useParams(); //id pitanja i id lekcije
  const [ispit, setIspit] = useState({}); //ispit spremljen u state za id za pitanja
  const [data, setData] = useState([]); //za slanje pitanja i odgovora
  const [sadrzaj, setSadrzaj] = useState(); //dohvatanje podataka (pitanja)
  const [odgovor, setOdgovor] = useState([]); //privremeno sprema pitanje s odgovorom koje ide u data
  const [korisnik] = useState(JSON.parse(sessionStorage.getItem("user"))); //podaci o korisniku se dohvacaju iz session storage
  const [pitanja, setPitanja] = useState([]); //povucena sva pitanja za ovu lekciju, koristi se za dobivanja id-a za history push

  //stavljanje pitanja i odgovora u data state, na zadnjem pitanju se podaci salju u bazu
  const handlePitanjeOdgovor = () => {
    //postavljanje podataka u data u json objekt kako je u bazi
    setData([
      ...data,
      {
        idPitanja: pitanje,
        idIspit: ispit._id,
        naziv: sadrzaj.naziv,
        odgovori: odgovor,
        maksBodova: sadrzaj.maksBodova,
        tip: sadrzaj.tip,
        student: korisnik._id,
        tecaj: id,
      },
    ]);

    //privremeni odgovor se resetira u prazni array
    setOdgovor([]);
    //------------------------------------------------------------preusmjeravanje na sljedece pitanje i slanje u bazu ako je zadnje pitanje------------------------//
    const index = pitanja.findIndex((x) => x._id === pitanje);
    if (index + 1 < pitanja.length) {
      const sljedecePitanje = pitanja[index + 1]._id;
      history.push(`/tecaj/${id}/kviz/${sljedecePitanje}`);
    } else {
      //posalji
      const posaljiOdgovorenaPitanja = async () => {
        await axios
          .post(`/ispit/dodajRjesenaPitanja`, data)
          .then((res) => {
            alert("Uspješno poslano!");
          })
          .catch((err) => {
            console.log({ message: err.message });
          });
      };
      posaljiOdgovorenaPitanja();
    }
  };
  //dodavanje u privremeni state za jedan tocan
  const handleJedanTocan = (event) => {
    setOdgovor(event.target.value);
  };
  //dodavanje u privremeni kad je vise odgovora
  const handleViseTocnih = (event) => {
    if (odgovor.length === 0) {
      setOdgovor([event.target.value]);
    } else {
      if (event.target.checked) {
        setOdgovor([...odgovor, event.target.value]);
      } else {
        setOdgovor(odgovor.filter((val) => val !== event.target.value));
      }
    }
  };

  //---------------------------dohvaca se novo pitanje svaki put kad se varijabla pitanje u url-u promjeni------------------------------------------//
  useEffect(() => {
    const dohvatiPitanje = async () => {
      await axios
        .get(`/pitanje/dohvatiPoId/${pitanje}`)
        .then((res) => {
          setSadrzaj(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiPitanje();
  }, [pitanje]);
  //----------------------------------------------------kod ucitavanja stranice se kreira ispis s id-om studenta i id-om korisnika, sprema u ispit state ------------------------------//
  useEffect(() => {
    const kreirajIspit = async () => {
      await axios
        .post(`/ispit/dodaj`, {
          student: korisnik._id,
          tecaj: id,
        })
        .then((res) => {
          setIspit(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    kreirajIspit();
  }, []);
  useEffect(() => {
    //-----------------------------------------------pitanja koja se koriste za dobavljanje id-a za redirect na sljedece i na pocetku----------------------------//
    const dohvatiPitanja = async () => {
      await axios
        .get(`/pitanje/${id}`)
        .then((res) => {
          setPitanja(res.data);
          if (typeof pitanje === "undefined") {
            history.push(`/tecaj/${id}/kviz/${res.data[0]._id}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiPitanja();
  }, [pitanje, id]);

  //--------------------------------------------------------------tekst za rijesiti pitanja--------------------------------------------------------//
  const getUpute = () => {
    switch (sadrzaj.tip) {
      case "jedanTocan":
        return "Odaberite jedan točan odgovor:";
      case "viseTocnih":
        return "Odaberite više točnih odgovora:";
      case "esejsko":
        return "Ukratko odgovorite na sljedeće pitanje:";
      case "dopuni":
        return "Dopunite sljedeću rečenicu:";
      case "tocnoNetocno":
        return "Za sljedeću tvrdnju odaberite je li točna ili netočna:";
      default:
        return "Greška, pokušajte ponovno kasnije!";
    }
  };
  //--------------------------------------------------------------svaka vrsta pitanja ima drugaciji prikaz--------------------------------------------------------//
  const ponudiOdgovore = () => {
    switch (sadrzaj.tip) {
      case "jedanTocan":
        return (
          <div>
            <form key={odgovor}>
              {sadrzaj.odgovori.map((odgovor) => (
                <div
                  style={{ display: "inline-flex", width: "100%" }}
                  key={odgovor}
                >
                  <label htmlFor={odgovor} style={{ order: 1 }}>
                    {odgovor}
                  </label>
                  <Input
                    type="radio"
                    value={odgovor}
                    id={odgovor}
                    name={odgovor}
                    onChange={handleJedanTocan}
                  />
                </div>
              ))}
            </form>
            <Button name="Pošalji" onClick={handlePitanjeOdgovor} />
          </div>
        );
      case "viseTocnih":
        return (
          <div>
            {sadrzaj.odgovori.map((odg) => (
              <form key={odg}>
                <fieldset style={{ display: "inline-flex", width: "100%" }}>
                  <label htmlFor={odg} style={{ order: 1 }}>
                    {odg}
                  </label>
                  <Input
                    type="checkbox"
                    value={odg}
                    id={odg}
                    name={odg}
                    onChange={handleViseTocnih}
                  />
                </fieldset>
              </form>
            ))}
            <Button name="Pošalji" onClick={handlePitanjeOdgovor} />
          </div>
        );
      case "esejsko":
        return (
          <div>
            <form>
              <textarea value={odgovor} onChange={handleJedanTocan}></textarea>
            </form>
            <Button name="Pošalji" onClick={handlePitanjeOdgovor} />
          </div>
        );
      case "dopuni":
        return (
          <div>
            <form>
              <Input
                type="text"
                value={odgovor}
                onChange={handleJedanTocan}
                id="tekst"
                name="tekst"
              />
            </form>
            <Button name="Pošalji" onClick={handlePitanjeOdgovor} />
          </div>
        );
      case "tocnoNetocno":
        return (
          <div>
            <form>
              <div style={{ display: "inline-flex", width: "100%" }}>
                <label htmlFor="točno" style={{ order: 1 }}>
                  Točno
                </label>
                <Input
                  type="radio"
                  value="točno"
                  id="točno"
                  name="tocnoNetocno"
                  onChange={handleJedanTocan}
                />
              </div>
              <div style={{ display: "inline-flex", width: "100%" }}>
                <label htmlFor="netočno" style={{ order: 1 }}>
                  Netočno
                </label>
                <Input
                  type="radio"
                  value="netočno"
                  id="netočno"
                  name="tocnoNetocno"
                  onChange={handleJedanTocan}
                />
              </div>
            </form>
            <Button name="Pošalji" onClick={handlePitanjeOdgovor} />
          </div>
        );
      default:
        return "Greška, pokušajte ponovno kasnije!";
    }
  };
  //--------------------------------------------------------------ui render na kraju s gornjim funkcijama--------------------------------------------------------//
  return (
    <>
      <Navigation />
      <div className={styles.Container}>
        <div className={styles.Content}>
          <div className={styles.BoxWrapper}>
            <h3>{sadrzaj && getUpute()}</h3>
            <div className={styles.Box}>
              {sadrzaj && sadrzaj.naziv}
              <div className={styles.BoxForm}>
                {sadrzaj && ponudiOdgovore()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Quizz;
