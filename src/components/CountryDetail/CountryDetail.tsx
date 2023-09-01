import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CountryDetail.css";
import { fetchAllCountries, fetchCountryByAlpha3Code  } from "../../apiFunction";

interface CountryDetailProps {
  countryName: string;
  capital: string;
  population: number;
}

interface CountryData {
  nativeName: string;
  region: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: { name: string }[];
  languages: { name: string }[];
  borders: string[]; 
  flags: { svg: string };
}

const CountryDetail: React.FC<CountryDetailProps> = ({
  countryName,
  capital,
  population,
}) => {
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountryData();
  }, []);

  useEffect(() => {
    fetchBorderCountries();
  }, [countryData]);

  // const fetchCountryData = () => {
  //   fetch("https://restcountries.com/v2/all")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const country = data.find(
  //         (country: any) => country.name === countryName
  //       );
  //       if (country) {
  //         setCountryData(country);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };
  const fetchCountryData = () => {
    fetchAllCountries()
      .then((data: any[]) => {
        const country = data.find(
          (country: any) => country.name === countryName
        );
        if (country) {
          setCountryData(country);
        }
      })
      .catch((error: any) => console.log(error));
  };

  // const fetchBorderCountries = () => {
  //   if (countryData?.borders) {
  //     const alpha3Codes = countryData.borders;
  //     Promise.all(
  //       alpha3Codes.map((code) =>
  //         fetch(`https://restcountries.com/v2/alpha/${code}`)
  //           .then((response) => response.json())
  //           .then((data) => data.name)
  //       )
  //     )
  //       .then((names) => setBorderCountries(names))
  //       .catch((error) => console.log(error));
  //   }
  // };
  const fetchBorderCountries = () => {
    if (countryData?.borders) {
      const alpha3Codes = countryData.borders;
      Promise.all(
        alpha3Codes.map((code) =>
          fetchCountryByAlpha3Code(code)
            .then((data: { name: any; }) => data.name)
        )
      )
        .then((names) => setBorderCountries(names))
        .catch((error) => console.log(error));
    }
  };
  const navigateBack = () => {
    navigate(-1);
  };

  

  return (
    <div className="detail-main">
      <div className="back-class">
        <button className="back-button" onClick={navigateBack}>
          <div id="left-arrow">&larr;</div>
          <h3 id="back-text">Back</h3>
        </button>
      </div>
      <div className="detail-div">
        <div className="detail-flag">
          {countryData && countryData.flags && (
            <img
              src={countryData.flags.svg}
              alt={`${countryName} Flag`}
              className="flag-image"
            />
          )}
        </div>
        <div className="text-div">
          <div className="upper-text">
            <div className="left-upper">
              <h2 id="detail-countryname">{countryName}</h2>
              <div className="native-main">
                <p id="native-left">Native Name:</p>
                <p id="native-right">{countryData?.nativeName || ""}</p>
              </div>
              <div className="population-main">
                <p id="population-left">Population:</p>
                <p id="population-right">{population}</p>
              </div>
              <div className="region-main">
                <p id="Region-left">Region:</p>
                <p id="Region-right">{countryData?.region || ""}</p>
              </div>
              <div className="sub-region-main">
                <p id="Sub-Region-left">Sub Region:</p>
                <p id="Sub-Region-right">{countryData?.subregion || ""}</p>
              </div>
              <div className="capital-main">
                <p id="Capital-left">Capital:</p>
                <p id="Capital-right">{capital}</p>
              </div>
            </div>
            <div className="right-upper">
              <div className="tld">
                <p id="top-level-left">Top Level Domain:</p>
                <p id="top-level-right">
                  {countryData?.topLevelDomain?.join(", ") || ""}
                </p>
              </div>
              <div className="currency-main">
                <p id="Currencies-left">Currencies:</p>
                <p id="Currencies-right">
                  {countryData?.currencies
                    ?.map((currency) => currency.name)
                    .join(", ") || ""}
                </p>
              </div>
              <div className="language">
                <p id="Languages-left">Languages:</p>
                <p id="Languages-right">
                  {countryData?.languages
                    ?.map((language) => language.name)
                    .join(", ") || ""}
                </p>
              </div>
            </div>
          </div>
          <div className="lower-text">
            <p id="Border">Border Countries:</p>
            <div className="border-cards">
              {borderCountries.map((border) => (
                <p key={border} id="single-border">
                  {border}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;