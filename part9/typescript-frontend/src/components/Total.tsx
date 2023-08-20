import { CourseData } from "../App";

interface CourseParts {
  courseParts: CourseData[]
}

export default function Total({ courseParts }: CourseParts) {
  return (
    <p>
      Number of exercises
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}