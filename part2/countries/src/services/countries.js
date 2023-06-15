const key = process.env.REACT_APP_API_KEY;
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const weatherUrl = '';

async function getCountries() {
  const res = await fetch(countriesUrl);
  const countries = await res.json();
  return countries;
}

export default { getCountries };