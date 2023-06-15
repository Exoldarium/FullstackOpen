export default function CountriesList({ country, inputValue, displayClickedCountry }) {
  const list =
    <li>
      <p>{country.name.common}</p>
      <button onClick={displayClickedCountry} name={country.name.common}>Show</button>
    </li>;

  return (
    <div>
      <ul>
        {/* only diplay countries list if there is input value */}
        {inputValue !== '' ? list : ''}
      </ul>
    </div>
  )
}