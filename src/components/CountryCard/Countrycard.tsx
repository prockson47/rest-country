import React from "react";
import { Link } from "react-router-dom";
import "./Countrycard.css";

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
  const { name, flag, population, region, capital } = countryData;

  return (
    <div className="div-main">
      <Link
        to={`/country-detail?countryName=${name}&capital=${capital}&population=${population}`}
        className="country-card"
      >
        <img id="flag" src={flag} alt={name} className="flag-image" />
        <h2 id="countryName">{name}</h2>
        <div className="population">
          <p id="population-left">Population</p>
          <p id="population-right">: {population}</p>
        </div>
        <div className="region">
          <p id="region-left">Region</p>
          <p id="region-right">: {region}</p>
        </div>
        <div className="capital">
          <p id="capital-left">Capital</p>
          <p id="capital-right">: {capital}</p>
        </div>
      </Link>
    </div>
  );
};

export default CountryCard;
