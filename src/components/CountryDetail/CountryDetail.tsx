import React from "react";

interface CountryDetailProps {
  countryName: string;
  capital: string;
  population: number;
}

const CountryDetail: React.FC<CountryDetailProps> = ({
  countryName,
  capital,
  population,
}) => {
  return (
    <div>
      <h1>Country Detail</h1>
      <h2>Country: {countryName}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
    </div>
  );
};

export default CountryDetail;
