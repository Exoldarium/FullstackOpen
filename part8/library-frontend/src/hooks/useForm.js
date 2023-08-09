import { useState } from "react";

export default function useForm(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);

  function handleInputs(e) {
    let { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  }

  function clearForm() {
    setInputs(initialState);
  }

  return {
    inputs,
    handleInputs,
    clearForm
  }
}