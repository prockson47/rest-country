import React, { useEffect, useState } from "react";
import "./App.css";
import "./dark-theme.css"; 
import { fetchCountryByName, getCountryData } from "./apiService";
import Header from "../src/components/Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  
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
  const [, setCountries] = useState<Country[]>([]);
  const [, setFilteredCountries] = useState<Country[]>([]);
  // eslint-disable-next-line no-empty-pattern
  const [] = useState<string>("");
  // eslint-disable-next-line no-empty-pattern
  const [] = useState<string>("");

  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await getCountryData(); 
  
        setCountries(countryData);
        setFilteredCountries(countryData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
  
    fetchCountries();
  }, []);
  

 




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