import React, { useState, useEffect } from "react";
import styles from "./Editor.module.scss";
import ReactMarkdown from "react-markdown";
import Button from "../Button/Button";
import axios from "axios";
const Editor = (props) => {
  const [data, setData] = useState(props.sadrzaj);
  const handleChange = (event) => {
    setData(event.target.value);
  };

  const handlePosaljiSadrzaj = () => {
    const posalji = {
      _id: props.lekcijaId,
      sadrzaj: data,
    };
    console.log(posalji);
    const posaljiSadrzaj = async () => {
      axios
        .patch(`/lekcija/uredi`, posalji)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    posaljiSadrzaj();
    alert("Sadržaj promjenjen!");
  };
  useEffect(() => {
    setData(props.sadrzaj);
  }, [props.sadrzaj]);
  return (
    <>
      {props.predavac ? (
        <>
          <Button name="Promjeni sadržaj" onClick={handlePosaljiSadrzaj} />
          <div className={styles.Container}>
            <div className={styles.EditorContainer}>
              <h2>Unos</h2>
              <textarea
                className={styles.TextArea}
                value={data}
                onChange={handleChange}
              />
            </div>

            <div className={styles.EditorContainer}>
              <h2>Prikaz</h2>

              <div className={styles.TextArea}>
                <ReactMarkdown>{data}</ReactMarkdown>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.TextArea}>
          <ReactMarkdown>{data}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default Editor;
