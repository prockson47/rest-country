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


export const fetchCountryByName = async (countryName: string) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        return data[0];
      } else {
        throw new Error("Country not found");
      }
    } catch (error) {
      throw error;
    }
  };
  
  