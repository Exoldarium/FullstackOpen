import { useState } from "react";
import { NewEntry } from "../types";

function useForm(initialState: NewEntry) {
  const [inputs, setInputs] = useState(initialState)

  function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;

    if (inputs.type === 'HealthCheck') {
      inputs.healthCheckRating = Number(inputs.healthCheckRating);
    }

    setInputs({
      ...inputs,
      [name]: value
    });
  }

  return {
    inputs,
    handleInputs
  }
}

export default useForm;