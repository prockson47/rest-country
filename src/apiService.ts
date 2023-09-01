const API_BASE_URL = 'https://restcountries.com/v3.1/all';

async function fetchData() {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getCountryData() {
  try {
    const data = await fetchData();

    return data.map((country: any) => ({
      flag: country.flags?.svg || "",
      name: country.name?.common || "",
      population: country.population || 0,
      region: country.region || "",
      capital: country.capital?.[0] || "",
      nativeName: country.name?.nativeName?.common || "",
      subRegion: country.subregion || "",
      borders: country.borders || [],
      topLevelDomain: country.tld || [], 
      currencies: Object.values(country.currencies || {}), 
      languages: Object.values(country.languages || {})
    }));
  } catch (error) {
    console.error('Error fetching country data:', error);
    throw error;
  }
}


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



export const fetchCountryData = async (countryName: string) => {
  try {
    const response = await fetch(`https://restcountries.com/v2/all`);
    const data = await response.json();
    const country = data.find((country: any) => country.name === countryName);
    return country;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchBorderCountries = async (alpha3Codes: string[]) => {
  try {
    const borderCountries = await Promise.all(
      alpha3Codes.map((code) => {
        return fetch(`https://restcountries.com/v2/alpha/${code}`)
          .then((response) => response.json())
          .then((data) => data.name);
      })
    );
    return borderCountries;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
