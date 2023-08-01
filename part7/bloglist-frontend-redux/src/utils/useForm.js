import { useState } from 'react';

export default function useForm(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);

  function getInputs(e) {
    let { name, value, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    setInputs({
      ...inputs,
      [name]: value
    });
  }

  function clearForm() {
    setInputs(initialState);
  }

  const service = {
    getInputs,
    clearForm,
    setInputs
  }

  return [
    inputs,
    service,
    setInputs
  ]
}