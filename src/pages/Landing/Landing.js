import React from "react";
import { Card, SecondaryCard } from "./Card/Card";
import useAxios from "axios-hooks";
const Landing = () => {
  const [{ data, loading, error }] = useAxios("/tecaj/dohvatiSve");
  loading && console.log("loading");
  error && console.log("error");
  return (
    <div>
      {data &&
        data.map((tecaj, index) =>
          index % 2 === 0 ? (
            <Card
              title={tecaj.naziv}
              description={tecaj.opis}
              key={tecaj._id}
              link={tecaj._id}
            />
          ) : (
            <SecondaryCard
              title={tecaj.naziv}
              description={tecaj.opis}
              key={tecaj._id}
              link={tecaj._id}
            />
          )
        )}
    </div>
  );
};

export default Landing;
