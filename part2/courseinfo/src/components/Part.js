export default function Part(props) {
  const { parts } = props;
  return (
    <>
      {parts.map(part => {
        return <p key={part.name}>{part.name} {part.exercises}</p>
      })}
    </>
  )
}