import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS, FILTER_BOOKS } from "../queries"
import { useState } from "react";

export default function Books() {
  // track if the user is filtering the books
  const [filter, setFilter] = useState(false);
  const { data, loading, error } = useQuery(ALL_BOOKS);
  const genresSet = new Set();

  if (data) {
    const { allBooks } = data;

    for (const key of allBooks) {
      for (const genres of key.genres)
        // add genres to a Set() so that each value is unique
        genresSet.add(genres);
    }
  }

  // we convert the set into an array
  const genres = [...genresSet];
  // lazy query will be excuted after the filter is applied
  const [filterBooks, { data: genreData }] = useLazyQuery(FILTER_BOOKS);

  function filterByGenre(e) {
    filterBooks({
      variables: {
        genre: e.target.textContent
      }
    });
    setFilter(true);
  }

  if (loading) return <div>loading ...</div>
  if (error) return <div>there was an error</div>

  return (
    <>
      <h1>books</h1>
      <p>in genre</p>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        {filter ?
          genreData?.allBooks.map(book => (
            <tbody key={book.id}>
              <tr>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            </tbody>
          ))
          :
          data?.allBooks.map(book => (
            <tbody key={book.id}>
              <tr>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            </tbody>
          ))
        }
      </table>
      <div>
        {genres.map((genre, i) => (
          <button key={i} type="button" onClick={filterByGenre}>{genre}</button>
        ))}
        <button type="button" onClick={() => setFilter(false)}>all genres</button>
      </div>
    </>
  )
}