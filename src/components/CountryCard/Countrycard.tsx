import React from "react";

type CountryCardProps = {
  countryData: {
    name: string;
    flag: string;
    population: number;
    region: string;
    capital: string;
  };
};

const CountryCard: React.FC<CountryCardProps> = ({ countryData }) => {
  return (
    <div className="country-card">
      <img
        id="flag"
        src={countryData.flag}
        alt={countryData.name}
        className="flag-image"
      />
      <h2 id="countryName">{countryData.name}</h2>
      <p id="population">Population: {countryData.population}</p>
      <p id="region">Region: {countryData.region}</p>
      <p id="capital">Capital: {countryData.capital}</p>
    </div>
  );
};

export default CountryCard;
