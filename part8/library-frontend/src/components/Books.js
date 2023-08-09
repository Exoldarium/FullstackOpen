import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

export default function Books() {
  const { data, loading, error } = useQuery(ALL_BOOKS);

  if (loading) return <div>loading ...</div>
  if (error) return <div>there was an error</div>

  return (
    <>
      <h1>books</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        {data.allBooks.map(book => (
          <tbody key={book.id}>
            <tr>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  )
}