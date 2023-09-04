const API_BASE_URL = 'https://restcountries.com/v3.1/all';
const countryCache = new Map(); // Use a Map for caching

async function fetchData(url: RequestInfo | URL) {
  try {
    if (countryCache.has(url)) {
      // If data is already cached, return it
      return countryCache.get(url);
    }

    const response = await fetch(url);
    const data = await response.json();

    // Cache the data
    countryCache.set(url, data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getCountryData() {
  try {
    const data = await fetchData(API_BASE_URL);

    return data.map((country: { flags: { svg: any; }; name: { common: any; nativeName: {
      common: any; 
}; }; population: any; region: any; capital: any[]; subregion: any; borders: any; tld: any; currencies: any; languages: any; }) => ({
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

