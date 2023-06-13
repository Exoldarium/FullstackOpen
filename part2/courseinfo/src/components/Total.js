export default function Total({ exercises }) {
  const total = exercises.reduce((tally, currentValue) => tally + currentValue.exercises, 0);
  return <p>Number of exercises {total}</p>
}
