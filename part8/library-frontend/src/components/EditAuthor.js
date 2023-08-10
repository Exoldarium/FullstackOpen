import { useMutation, useQuery } from "@apollo/client";
import useForm from "../hooks/useForm";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from 'react-select';
import { useState } from "react";

export default function EditAuthor({ setError }) {
  const { inputs, handleInputs, clearForm } = useForm({
    name: '',
    setBornTo: ''
  });
  const [selectedOption, setSelectedOption] = useState(null);

  const { data } = useQuery(ALL_AUTHORS);

  const authors = data?.allAuthors.map(author => {
    return {
      value: author.name,
      label: author.name
    }
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    variables: {
      name: selectedOption.value,
      setBornTo: Number(inputs.setBornTo)
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      setError(messages);
    }
  });

  function addBirthYear(e) {
    e.preventDefault();
    editAuthor();
    clearForm();
  }

  return (
    <div>
      <h1>set birth year</h1>
      <form className="form" onSubmit={addBirthYear}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={authors}
        />
        <label htmlFor="setBornTo">born</label>
        <input
          name="setBornTo"
          onChange={handleInputs}
          value={inputs.setBornTo}
        />
        <button type="submit">update</button>
      </form>
    </div>
  )
}