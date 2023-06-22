import React, { useEffect, useState } from "react";
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
  const [selectedRegion, setSelectedRegion] = useState("");

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
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchValue)
    );
    setFilteredCountries(filtered);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value;
    setSelectedRegion(selectedRegion);
    filterCountries(selectedRegion);
  };

  const filterCountries = (selectedRegion: string) => {
    if (selectedRegion) {
      const filtered = countries.filter(
        (country) => country.region === selectedRegion
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
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
    </div>
  );
};

export default App;
