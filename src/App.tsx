import React, { useEffect, useState } from "react";
import "./App.css";
import "./dark-theme.css"; 
import { getCountryData } from "./apiService";
import { fetchCountryByName } from "./apiFunction";
import Header from "../src/components/Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
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
  // flag: { svg: string };
  flag: string;
};





const CountryDetailWrapper: React.FC = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const countryName = queryParams.get("countryName");
  const capital = queryParams.get("capital");
  const population = queryParams.get("population");

  const [country, setCountry] = useState<Country | null>(null);

  // useEffect(() => {
  //   const fetchCountry = async () => {
  //     if (countryName) {
  //       const response = await fetch(
  //         `https://restcountries.com/v2/name/${countryName}`
  //       );
  //       const data = await response.json();
  //       if (Array.isArray(data)) {
  //         setCountry(data[0]);
  //       }
  //     }
  //   };

  //   fetchCountry();
  // }, [countryName]);

  

  // if (!country) {
  //   return <div>Country not found</div>;
  // }

  useEffect(() => {
    const fetchCountry = async () => {
      if (countryName) {
        try {
          const countryData = await fetchCountryByName(countryName); // Use the new API service function

          setCountry(countryData);
        } catch (error) {
          console.error("Error fetching country:", error);
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

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     const countryData = await getCountryData();
  //     const data = await response.json();
  //     setCountries(data);
  //     setFilteredCountries(data);
  //   };
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await getCountryData(); // Fetch data using your custom function
  
        setCountries(countryData);
        setFilteredCountries(countryData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
  
    fetchCountries();
  }, []);
  

  //   fetchCountries();
  // }, []);

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
