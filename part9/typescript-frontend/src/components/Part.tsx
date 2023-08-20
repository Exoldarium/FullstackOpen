import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart
}

export default function Part({ part }: PartProps) {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          {part.name} {part.description} {part.exerciseCount}
        </p>
      )
    case 'group':
      return (
        <p>
          {part.name} {part.groupProjectCount} {part.exerciseCount}
        </p>
      )
    case 'background':
      return (
        <p>
          {part.name} {part.description} {part.exerciseCount} {part.backgroundMaterial}
        </p>
      )
    case 'special':
      return (
        <>
          <p>
            {part.name} {part.description} {part.exerciseCount}
          </p>
          <p>required skills: {part.requirements[0]} {part.requirements[1]}</p>
        </>
      )
    default:
      // default always has to return something or the react will throw error that component is not returning anything
      return <p>Hey</p>
  }
}