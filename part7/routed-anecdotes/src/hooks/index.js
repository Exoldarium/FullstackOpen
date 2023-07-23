import { useState } from "react";

export default function useField(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);
  console.log({ inputs: inputs })

  function getInputValue(e) {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  function clearForm() {
    setInputs(initialState)
  }

  return {
    inputs,
    getInputValue,
    clearForm,
    setInputs
  }
}
