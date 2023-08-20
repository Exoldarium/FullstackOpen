interface CourseName {
  courseName: string;
}

export default function Header({ courseName }: CourseName) {
  return (
    <>
      <h1>{courseName}</h1>
    </>
  )
}