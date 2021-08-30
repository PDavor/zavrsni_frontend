import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Editor from "../../components/Small/Editor/Editor";
import Navigation from "../../components/Navigation/Navigation";
import ContentWraperRow from "../../components/ContentWraoperRow/ContentWraperRow";
import Footer from "../../components/Footer/Footer";
import Content from "../../components/Content/Content";
import { useParams } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Small/Input/Input.js";
import Button from "../../components/Small/Button/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
const Course = () => {
  const history = useHistory();
  const auth = JSON.parse(sessionStorage.getItem("user"));
  const [sadrzaj, setSadrzaj] = useState();
  const [naziv, setNaziv] = useState("");
  const [tecaj, setTecaj] = useState();
  const { id, lekcija } = useParams();
  useEffect(() => {
    if (typeof lekcija === "undefined") {
      const dohvatiLekciju = async () => {
        await axios
          .get(`/lekcija/${id}`)
          .then((res) => {
            history.push(`/tecaj/${id}/${res.data[0]._id}`);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      dohvatiLekciju();
    }
  }, []);
  const handleNazivLekcije = (event) => {
    setNaziv(event.target.value);
  };
  const handlePosaljiNaziv = () => {
    const posaljiNaziv = async () => {
      await axios
        .patch(`/lekcija/uredi`, { _id: lekcija, naziv })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    posaljiNaziv();
    alert("Naziv promjenjen!");
  };

  useEffect(() => {
    const dohvatiLekciju = async () => {
      await axios
        .get(`/lekcija/dohvatiPoId/${lekcija}`)
        .then((res) => {
          setSadrzaj(res.data);
          setNaziv(res.data.naziv);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiLekciju();

    const dohvatiTecaj = async () => {
      await axios
        .get(`/tecaj/dohvatiPoId/${id}`)
        .then((res) => {
          setTecaj(res.data);
          console.log("tecaj id", tecaj);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    dohvatiTecaj();
  }, [lekcija, id]);

  return (
    <>
      <Navigation />
      <ContentWraperRow>
        <Sidebar />
        <Content>
          {auth && auth.predaje === id && (
            <div>
              <Link to={`/tecaj/${id}/lekcijaAdministracija`}>
                <Button name="Kreiraj lekciju" />
              </Link>
              <Link to={`/tecaj/${id}/pitanjeAdministracija`}>
                <Button name="Kreiraj pitanje" />
              </Link>
            </div>
          )}
          {auth && auth.predaje === id
            ? sadrzaj && (
                <>
                  <Input
                    name="Naziv lekcije"
                    type="text"
                    placeholder="Naziv lekcije"
                    onChange={handleNazivLekcije}
                    value={naziv}
                  />
                  <Button name="Promjeni naziv" onClick={handlePosaljiNaziv} />
                </>
              )
            : sadrzaj && <h2 style={{ padding: "2rem" }}>{naziv}</h2>}

          {auth && auth.predaje === id
            ? sadrzaj && (
                <Editor
                  sadrzaj={sadrzaj.sadrzaj}
                  lekcijaId={lekcija}
                  predavac
                />
              )
            : sadrzaj && (
                <Editor sadrzaj={sadrzaj.sadrzaj} lekcijaId={lekcija} />
              )}
          <div style={{ paddingBottom: "2rem" }}></div>
        </Content>
      </ContentWraperRow>
      <Footer />
    </>
  );
};

export default Course;
