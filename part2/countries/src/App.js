import { useEffect, useState } from 'react';
import CountriesList from './components/CountriesList';
import DisplayWeather from './components/DisplayWeather';
import FindCountries from './components/FindCountries';
import SingleCountry from './components/SingleCountry';
import countryService from './services/countries';
import './index.css'

function App() {
  const [country, setCountry] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

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
  const displaySingleCountry = filteredListCopy.map(country => <SingleCountry country={country} key={country.cca2} />);
  const displayWeather = <DisplayWeather />;

  // grab data
  useEffect(() => {
    (async () => {
      const countries = await countryService.getCountries();
      setCountry(countries);
    })();
  }, []);

  // filter countries based on input value
  function findCountry(e) {
    const { value } = e.target;
    const filter = countriesCopy.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()));
    if (value) {
      setFilteredList(filter);
    }
    else {
      setCountry(countriesCopy);
    }
    setInputValue(value);
  }

  function displayClickedCountry(e) {
    const { name } = e.target;
    const findCountry = countriesCopy.find(country => country.name.common === name);
    setFilteredList([findCountry]);
  }

  return (
    <div >
      {findCountries}
      {filteredList.length === 1 ? displaySingleCountry : displayCountriesList}
      {displayWeather}
    </div>
  );
}

export default App;
