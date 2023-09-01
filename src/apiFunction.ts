// apiFunction.ts

export const fetchAllCountries = () => {
    return fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  };
  
  export const fetchCountryByAlpha3Code = (code: string) => {
    return fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  };



  
  