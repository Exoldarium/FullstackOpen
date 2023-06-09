export default function Filter({ filterNames }) {
  return (
    <div>
      filter shown with <input name="name" onChange={filterNames} />
    </div>
  )
}