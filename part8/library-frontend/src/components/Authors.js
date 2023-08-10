import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

export default function Authors() {
  const { data, loading, error } = useQuery(ALL_AUTHORS);

  if (loading) return <div>loading ...</div>
  if (error) return <div>there was an error</div>

  return (
    <>
      <div>
        <h1>authors</h1>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>born</th>
              <th>books</th>
            </tr>
          </thead>
          {data.allAuthors.map(author => (
            <tbody key={author.id}>
              <tr>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  )
}