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