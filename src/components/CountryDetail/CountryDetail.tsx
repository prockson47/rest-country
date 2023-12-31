import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CountryDetail.css";
import { getCountryData } from "../../apiService";

interface CountryDetailProps {
  countryName: string;
  capital: string;
  population: number;
}

const CountryDetail: React.FC<CountryDetailProps> = ({
  countryName,
  capital,
  population,
}) => {
  const [countryData, setCountryData] = useState<any | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCountryData = async () => {
      try {
        const data = await getCountryData();
        const country = data.find((country: any) => country.name === countryName);
        if (country) {
          setCountryData(country);
    
          // Fetch border country names
          // const borderNames = await Promise.all(
          //   country.borders.map(async (borderCode: string) => {
          //     const borderCountry = data.find(
          //       (c: any) => c.alpha3Code === borderCode
          //     );
          //     return borderCountry?.name || borderCode;
          //   })
          // );
    
          // setBorderCountries(borderNames);
          const borderNames = await Promise.all(
            country.borders.map(async (borderCode: string) => {
              const borderCountry = data.find(
                (c: any) => c.alpha3Code === borderCode
              );
              return borderCountry?.name || borderCode;
            })
          );
          
          // Fetch the actual country names for border countries
          const actualBorderNames = borderNames.map((borderNameOrCode: string) => {
            const borderCountry = data.find(
              (c: any) => c.name === borderNameOrCode
            );
            return borderCountry?.name || borderNameOrCode;
          });
          
          setBorderCountries(actualBorderNames);
          
          console.log("Country Data:", country);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    

    // Log the countryName and countryData
    console.log("countryName:", countryName);
    console.log("countryData:", countryData);

    fetchCountryData();
  }, [countryData, countryName]);

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
          {countryData && countryData.flag && (
            <img
              src={countryData.flag}
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

                <p id="native-right">
                  {countryData?.name?.nativeName?.common || "N/A"}
                </p>
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
                <p id="Sub-Region-right">{countryData?.subRegion || "N/A"}</p>
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
                    ?.map((currency: { name: any }) => currency.name)
                    .join(", ") || ""}
                </p>
              </div>

              <div className="language">
                <p id="Languages-left">Languages:</p>
                <p id="Languages-right">
                  {countryData?.languages
                    ? Object.values(countryData.languages).join(", ")
                    : "N/A"}
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
