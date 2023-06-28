import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../src/components/Header/Header";
import CountryCard from "../src/components/CountryCard/Countrycard";

type Country = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
};

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v2/all");
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    };

    fetchCountries();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchValue(searchValue);
    filterCountries(selectedRegion, searchValue);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value;
    setSelectedRegion(selectedRegion);
    filterCountries(selectedRegion, searchValue);
  };

  const filterCountries = (selectedRegion: string, searchValue: string) => {
    let filtered = countries;

    if (selectedRegion) {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    if (searchValue) {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchValue)
      );
    }

    setFilteredCountries(filtered);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <div className="search-container">
          <span className="search-icon">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            placeholder="Search by country"
            className="countrySearch"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>

        <div className="dropdown">
          <select
            id="region-select"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className="country-grid">
          {filteredCountries.map((country) => (
            <CountryCard key={country.name} countryData={country} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
