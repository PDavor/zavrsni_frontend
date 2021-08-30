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
const CreateLecture = () => {
  const { id } = useParams();
  const history = useHistory();
  const auth = JSON.parse(sessionStorage.getItem("user"));
  if (auth === null) {
    history.push("/");
  } else {
    if (auth.predaje !== id) {
      history.push("/");
    }
  }
  const [naziv, setNaziv] = useState("");
  const [lekcije, setLekcije] = useState([]); //array dohvacenih lekcija
  const [lekcija, setLekcija] = useState(); //state za select/option
  const [sidebarRefresh, setSidebarRefresh] = useState(1);

  const handleNaziv = (event) => {
    setNaziv(event.target.value);
  };

  const handleLekcija = (event) => {
    setLekcija(event.target.value);
  };

  const handleKreirajLekciju = () => {
    const kreirajLekciju = async () => {
      await axios
        .post(`/lekcija/dodaj`, { tecaj: id, naziv })
        .then((res) => {
          history.push(`/tecaj/${id}/${res.data._id}`);
          alert("Lekcija uspješno dodana, možete dodati sadržaj!");
        })
        .catch((err) => {
          console.log({ message: err.message });
        });
    };
    kreirajLekciju();
  };
  //dohvati lekcije za dropdown
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
  }, [id]);
  const handleIzbrisiLekciju = () => {
    const izbrisiLekciju = async () => {
      await axios
        .delete(`/lekcija/izbrisi`, { data: { _id: lekcija } })
        .then((res) => {
          setSidebarRefresh(sidebarRefresh + 1);
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
          alert("Lekcija uspješno izbrisana!");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    izbrisiLekciju();
  };

  return (
    <>
      <Navigation />
      <ContentWraperRow>
        <Sidebar refresh={sidebarRefresh} />
        <Content align>
          <FormContainer>
            <h2 className="Title">Dodaj lekciju</h2>
            <label htmlFor="Naziv">Naziv:</label>
            <Input
              name="Naziv"
              type="text"
              placeholder="Naziv"
              onChange={handleNaziv}
              value={naziv}
            />

            <Button name="Kreiraj lekciju" onClick={handleKreirajLekciju} />

            <h2 className="Title" style={{ marginTop: 50 }}>
              Izbriši lekciju
            </h2>
            <label htmlFor="Naziv lekcije">Naziv lekcije:</label>

            <select
              id="Naziv lekcije"
              name="Naziv lekcije"
              onChange={handleLekcija}
              value={lekcija}
            >
              <option value="0">Odaberi lekciju</option>
              {lekcije &&
                lekcije.map((lekcija) => (
                  <option value={lekcija._id} key={lekcija._id}>
                    {lekcija.naziv}
                  </option>
                ))}
            </select>

            <Button name="Izbriši lekciju" onClick={handleIzbrisiLekciju} />
          </FormContainer>
        </Content>
      </ContentWraperRow>
      <Footer />
    </>
  );
};

export default CreateLecture;
