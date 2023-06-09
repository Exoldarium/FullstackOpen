import Part from "./Part";

export default function Content(props) {
  const { parts } = props;
  return (
    <>
      <Part parts={parts} />
    </>
  )
}
