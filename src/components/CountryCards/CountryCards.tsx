import React, { useEffect, useState } from "react";
import "./CountryCards.css";

interface Country {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
  alpha3Code: string;
}

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const { name, flag, population, region, capital, alpha3Code } = country;

  const handleClick = () => {
    const url = `country-detail?countryName=${name}&capital=${capital}&population=${population}`;
    window.open(url, "_blank");
  };


  return (
    <div className="country-card" onClick={handleClick}>
      <img id="flag" src={flag} alt={name} className="flag-image" />
      <h2 id="countryName">{name}</h2>
      <p id="population">Population: {population}</p>
      <p id="region">Region: {region}</p>
      <p id="capital">Capital: {capital}</p>
    </div>
  );
};

const CountryCards: React.FC = () => {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v2/all");
      const data = await response.json();
      setFilteredCountries(data);
    };

    fetchCountries();
  }, []);

  const filterCountries = () => {
    let filtered = filteredCountries;
    if (searchValue) {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return filtered;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <div className="search-container">
        <span className="search-icon">
          <i className="fa fa-search" aria-hidden="true"></i>
        </span>
        <input
          type="text"
          placeholder="Search by country"
          className="countrySearch"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      <div className="country-cards">
        {filterCountries()
          .slice(0, 8)
          .map((country) => (
            <CountryCard key={country.alpha3Code} country={country} />
          ))}
      </div>
    </div>
  );
};

export default CountryCards;
