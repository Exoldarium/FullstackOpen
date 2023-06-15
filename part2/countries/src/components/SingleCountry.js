import { convertToCelsius } from "../services/convertToCelsius"

export default function SingleCountry({ country, weather }) {
  return (
    <>
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map(language => {
            return <li key={language}>{language}</li>
          })}
        </ul>
        <img alt="flag" src={country.flags.png} />
      </div>
      <div>
        <h1>Weather in {country.capital[0]}</h1>
        <p>Temperature {convertToCelsius(weather.main.temp)} Celsius</p>
        <img alt="weatherIcon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    </>
  )
}