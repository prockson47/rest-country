import React, { Key, useEffect, useState } from "react";
import "./CountryCards.css";
import CountryCard from "../CountryCard/Countrycard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getCountryData } from "../../apiService";

interface Country {
  id: Key | null | undefined;
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
  countryName: string;
}

const CountryCards: React.FC = () => {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await getCountryData();
        setFilteredCountries(countryData);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  const filterCountries = () => {
    let filtered = filteredCountries;
    if (selectedRegion) {
      filtered = filtered.filter((country) =>
        country.region.toLowerCase().includes(selectedRegion.toLowerCase())
      );
    }
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

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div className="main-card">
      <div className="search-container">
        <div className="search-bar">
          <span className="search-icons">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            placeholder={" Search by country"}
            className="countrySearches"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        <select
          className="region-dropdown"
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value="">Search by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="Main-div">
  {filterCountries().map((country) => (
    <CountryCard key={country.id} countryData={country} />
  ))}
</div>

    </div>
  );
};

export default CountryCards;
