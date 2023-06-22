import React, { useEffect, useState } from "react";

interface Country {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
  alpha3Code: string;
}

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
    // Filter countries based on searchValue
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

      {/* Add a dropdown button for the regions */}
      <div className="dropdown">
        {/* <button className="dropdown-button">Filter by Region</button> */}
        <div className="dropdown-content">
          <select id="region-select">
            <option value="">Filter by Region</option>
          </select>
        </div>
      </div>

      {/* Render the country cards */}
      <div className="country-cards">
        {filterCountries().map((country) => (
          <CountryCard key={country.alpha3Code} country={country} />
        ))}
      </div>
    </div>
  );
};

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const { name, flag, population, region, capital, alpha3Code } = country;

  const handleClick = () => {
    // Redirect to country.html with country code as query parameter
    window.location.href = `country.html?code=${alpha3Code}`;
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

export default CountryCards;
