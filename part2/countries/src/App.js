import { useEffect, useState } from 'react';
import CountriesList from './components/CountriesList';
import FindCountries from './components/FindCountries';
import SingleCountry from './components/SingleCountry';
import countryService from './services/countries';
import './index.css'

function App() {
  const [country, setCountry] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [weather, setWeather] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const countriesCopy = [...country];
  const filteredListCopy = [...filteredList];

  const findCountries = <FindCountries findCountry={findCountry} />;
  const displayCountriesList = filteredListCopy
    .map(country =>
      <CountriesList
        country={country}
        key={country.cca2}
        inputValue={inputValue}
        displayClickedCountry={displayClickedCountry}
      />);
  const displaySingleCountry = filteredListCopy
    .map(country =>
      <SingleCountry
        country={country}
        key={country.cca2}
        weather={weather}
      />);

  // grab data
  useEffect(() => {
    (async () => {
      const countries = await countryService
        .getCountries()
        .catch(err => console.log(err));
      setCountry(countries);
    })();
  }, []);

  // filter countries based on input value
  async function findCountry(e) {
    const { value } = e.target;
    const filter = countriesCopy.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()));
    if (filter.length === 1) {
      const weather = await countryService
        .getWeather(filter[0].capital[0])
        .catch(err => console.log(err));
      setWeather(weather);
    }
    if (value) {
      setFilteredList(filter);
    }
    else {
      setCountry(countriesCopy);
    }
    setInputValue(value);
  }

  async function displayClickedCountry(e) {
    const { name } = e.target;
    const findCountry = countriesCopy.find(country => country.name.common === name);
    const weather = await countryService
      .getWeather(findCountry.capital[0])
      .catch(err => console.log(err));
    setWeather(weather);
    setFilteredList([findCountry]);
  }

  return (
    <div >
      {findCountries}
      {filteredList.length === 1 ? displaySingleCountry : displayCountriesList}
    </div>
  );
}

export default App;
