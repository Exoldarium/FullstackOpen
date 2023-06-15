const key = process.env.REACT_APP_API_KEY;
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

async function getCountries() {
  const res = await fetch(countriesUrl);
  const countries = await res.json();
  return countries;
}

async function getWeather(city) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`);
  const weather = await res.json();
  return weather;
}

export default { getCountries, getWeather };