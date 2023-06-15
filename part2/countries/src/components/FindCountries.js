export default function FindCountries({ findCountry }) {
  return (
    <div>
      find countries <input name="name" onChange={findCountry} />
    </div>
  )
}