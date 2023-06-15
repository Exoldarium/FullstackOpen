export default function SingleCountry({ country }) {
  return (
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
  )
}