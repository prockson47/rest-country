import React from "react";
import { useLocation } from "react-router-dom";
import CountryDetail from "../components/CountryDetail/CountryDetail"; 

type CountryDetailProps = {
  countryName: string;
  capital: string;
  population: number;
  nativeName: string;
  region: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: { name: string }[];
  languages: { name: string }[];
  borders: string[];
  flag: string;
};

interface CountryDetailWrapperProps {
  country: CountryDetailProps;
}

const CountryDetailWrapper: React.FC<CountryDetailWrapperProps> = ({
  country,
}) => {
  if (!country) {
    return <div>Country not found</div>;
  }

  return <CountryDetail {...country} />;
};

export default CountryDetailWrapper;
