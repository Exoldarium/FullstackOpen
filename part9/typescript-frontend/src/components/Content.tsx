import Part from "./Part";
import { CoursePart } from "../types";

interface CourseParts {
  courseParts: CoursePart[]
}

export default function Content({ courseParts }: CourseParts) {
  return (
    <>
      {courseParts.map((part, i) => (
        <Part part={part} key={i} />
      ))}
    </>
  )
}