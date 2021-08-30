import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navigation from "../../components/Navigation/Navigation";
import ContentWraperRow from "../../components/ContentWraoperRow/ContentWraperRow";
import Footer from "../../components/Footer/Footer";
import Content from "../../components/Content/Content";
import FormContainer from "../../components/Small/FormContainer/FormContainer";
import Input from "../../components/Small/Input/Input";
import Button from "../../components/Small/Button/Button";
import { useParams } from "react-router";
import axios from "axios";
import { useHistory } from "react-router";
const CreateQuestion = () => {
  const history = useHistory();
  const { id } = useParams();
  const auth = JSON.parse(sessionStorage.getItem("user"));
  if (auth === null) {
    history.push("/");
  } else {
    if (auth.predaje !== id) {
      history.push("/");
    }
  }
  const [odgovor, setOdgovor] = useState("");

  const [naziv, setNaziv] = useState("");

  const [bodovi, setBodovi] = useState("");

  const [odgovori, setOdgovori] = useState([]);

  const [tipPitanja, setTipPitanja] = useState("jedanTocan");

  const [pitanja, setPitanja] = useState([]); //za dropdown kod brisanja

  const [dohvacenoPitanje, setDohvacenoPitanje] = useState();

  const handleDohvacenoPitanje = (event) => {
    setDohvacenoPitanje(event.target.value);
  };

  const handleNaziv = (event) => {
    event.preventDefault();
    setNaziv(event.target.value);
  };

  const handleTipPitanja = (event) => {
    event.preventDefault();
    setTipPitanja(event.target.value);
  };

  const handleBodovi = (event) => {
    event.preventDefault();
    setBodovi(event.target.value);
  };

  const handleOdgovor = (event) => {
    event.preventDefault();
    setOdgovor(event.target.value);
  };

  const addOdgovori = (event) => {
    event.preventDefault();
    setOdgovori([...odgovori, odgovor]);
  };

  const removeOdgovori = (event) => {
    event.preventDefault();
    setOdgovori([]);
  };

  const handleKreirajPitanje = () => {
    const kreirajPitanjeSodgovorima = async () => {
      await axios
        .post(`/pitanje/dodaj`, {
          tecaj: id,
          naziv,
          maksBodova: bodovi,
          odgovori,
          tip: tipPitanja,
        })
        .then((res) => {
          setNaziv("");
          setBodovi("");
          setTipPitanja("jedanTocan");
          setOdgovor("");
          setOdgovori([]);
          alert("Pitanje uspješno dodano!");
        })
        .catch((err) => {
          console.log({ message: err.message });
        });
    };

    const kreirajPitanje = async () => {
      await axios
        .post(`/pitanje/dodaj`, {
          tecaj: id,
          naziv,
          maksBodova: bodovi,
          tip: tipPitanja,
        })
        .then((res) => {
          setNaziv("");
          setBodovi("");
          setTipPitanja("jedanTocan");
          alert("Pitanje uspješno dodano!");
        })
        .catch((err) => {
          console.log({ message: err.message });
        });
    };
    if (tipPitanja === "jedanTocan" || tipPitanja === "viseTocnih") {
      kreirajPitanjeSodgovorima();
    } else {
      kreirajPitanje();
    }
  };
  const handleIzbrisiPitanje = () => {
    const izbrisiPitanje = async () => {
      await axios
        .delete(`/pitanje/izbrisi`, { data: { _id: dohvacenoPitanje } })
        .then((res) => {
          const dohvatiPitanja = async () => {
            await axios
              .get(`/pitanje/${id}`)
              .then((res) => {
                setPitanja(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          };
          dohvatiPitanja();
          alert("Pitanje uspješno izbrisano!");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    izbrisiPitanje();
  };
  //dohvati pitanja za dropdown
  useEffect(() => {
    const dohvatiPitanja = async () => {
      await axios
        .get(`/pitanje/${id}`)
        .then((res) => {
          setPitanja(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiPitanja();
  }, [id]);
  return (
    <>
      <Navigation />
      <ContentWraperRow>
        <Sidebar />
        <Content align>
          <FormContainer>
            <h1 className="Title">Dodaj pitanje</h1>

            <label htmlFor="Tip pitanja">Tip pitanja:</label>
            <select
              id="Tip pitanja"
              name="Tip pitanja"
              onChange={handleTipPitanja}
              value={tipPitanja}
            >
              <option value="jedanTocan">Jedan točan odgovor</option>
              <option value="viseTocnih">Više točnih odgovora</option>
              <option value="esejsko">Esejsko</option>
              <option value="dopuni">Dopuni</option>
              <option value="tocnoNetocno">Točno/netočno</option>
            </select>

            <label htmlFor="Nosi bodova">Nosi bodova:</label>
            <Input
              name="Nosi bodova"
              type="number"
              placeholder="Nosi bodova"
              onChange={handleBodovi}
              value={bodovi}
            />

            <label htmlFor="Naziv pitanja">Naziv pitanja:</label>
            <Input
              name="Naziv pitanja"
              type="text"
              placeholder="Naziv pitanja"
              onChange={handleNaziv}
              value={naziv}
            />
            {(tipPitanja === "jedanTocan" || tipPitanja === "viseTocnih") && (
              <fieldset>
                <label htmlFor="Odgovori">Odgovori:</label>
                <Input
                  name="Odgovori"
                  type="text"
                  value={odgovor}
                  placeholder="Odgovori"
                  onChange={handleOdgovor}
                />
                <Button name="Dodaj odgovore" onClick={addOdgovori} />
                <Button name="Obriši odgovore" onClick={removeOdgovori} />
                <div>
                  {odgovori.map((odg) => (
                    <p key={odg}>{odg}</p>
                  ))}
                </div>
              </fieldset>
            )}

            <Button name="Kreiraj pitanje" onClick={handleKreirajPitanje} />

            <h1 style={{ marginTop: "50px" }}>Izbriši pitanje</h1>
            <label htmlFor="Naziv dohvacenog pitanja">Odaberi pitanje:</label>

            <select
              id="Naziv dohvacenog pitanja"
              name="Naziv lekcije"
              onChange={handleDohvacenoPitanje}
              value={dohvacenoPitanje}
            >
              <option value="0">Odaberi lekciju</option>
              {pitanja &&
                pitanja.map((pitanje) => (
                  <option value={pitanje._id} key={pitanje._id}>
                    {pitanje.naziv}
                  </option>
                ))}
            </select>
            {dohvacenoPitanje && (
              <Button name="Izbriši pitanje" onClick={handleIzbrisiPitanje} />
            )}
          </FormContainer>
        </Content>
      </ContentWraperRow>
      <Footer />
    </>
  );
};

export default CreateQuestion;
