import { useMutation } from "@apollo/client";
import useForm from "../hooks/useForm";
import { ADD_BOOK, ALL_BOOKS } from "../queries";
import { useNavigate } from "react-router-dom";

export default function AddBook({ setError }) {
  const navigate = useNavigate();
  const { inputs, handleInputs, clearForm } = useForm({
    title: '',
    author: '',
    published: '',
    genres: []
  });
  // we add the new book and convert published key to Int
  const [addBook, { data, error }] = useMutation(ADD_BOOK, {
    variables: {
      ...inputs,
      published: Number(inputs.published)
    },
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      setError(messages);
    }
  });


  function addNewBook(e) {
    e.preventDefault();
    addBook();
    clearForm();
    navigate('/books');
  }

  return (
    <div>
      <h1>add book</h1>
      <form className="form" onSubmit={addNewBook}>
        <label htmlFor="title">title</label>
        <input
          name="title"
          onChange={handleInputs}
          value={inputs.title}
        />
        <label htmlFor="author">author</label>
        <input
          name="author"
          onChange={handleInputs}
          value={inputs.author}
        />
        <label htmlFor="published">published</label>
        <input
          name="published"
          onChange={handleInputs}
          value={inputs.published}
        />
        <label htmlFor="genres">genres</label>
        <input
          name="genres"
          onChange={handleInputs}
          value={inputs.genres}
        />
        <button type="submit">add</button>
      </form>
    </div>
  )
}