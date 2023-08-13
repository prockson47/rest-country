import React, { useEffect, useState } from "react";
import "./App.css";
import "./dark-theme.css"; 
import Header from "../src/components/Header/Header";
import Main from "../src/components/Main/Main";
import CountryCard from "../src/components/CountryCard/Countrycard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouteProps,
  useParams,
  useLocation,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CountryCards from "../src/components/CountryCards/CountryCards";
import CountryDetail from "../src/components/CountryDetail/CountryDetail";

type Country = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital?: string;
};

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
  flags: { svg: string };
};

const CountryDetailWrapper: React.FC = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const countryName = queryParams.get("countryName");
  const capital = queryParams.get("capital");
  const population = queryParams.get("population");

  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      if (countryName) {
        const response = await fetch(
          `https://restcountries.com/v2/name/${countryName}`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setCountry(data[0]);
        }
      }
    };

    fetchCountry();
  }, [countryName]);

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <CountryDetail
      countryName={countryName || ""}
      capital={capital || ""}
      population={population ? parseInt(population) : 0}
    />
  );
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
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<CountryCards />} />
          <Route path="/country-detail" element={<CountryDetailWrapper />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
