import { useState } from "react";
import { DiaryEntry, Visibility, Weather } from "../types"
import parseDiaryEntry from "../utils";

export default function AddNewEntry() {
  const [inputs, setInputs] = useState({
    date: '',
    visibility: '',
    weather: '',
    comment: ''
  });
  const visibilityValues: string[] = Object.values(Visibility).map(v => v.toString());
  const weatherValues: string[] = Object.values(Weather).map(v => v.toString());

  // https://stackoverflow.com/questions/51326461/react-typescript-how-to-type-event-target-name-to-state
  function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, id } = e.target;

    if (name === 'visibility') {
      setInputs({
        ...inputs,
        visibility: id
      });
    }
    if (name === 'weather') {
      setInputs({
        ...inputs,
        weather: id
      });
    }

    setInputs({
      ...inputs,
      [name]: value
    })

    console.log(inputs)
  }

  return (
    <>
      <h1>Add new entry</h1>
      <form style={{ display: 'flex', flexDirection: 'column', width: '30vw' }}>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" onChange={handleInputs} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          Visibility:
          {visibilityValues.map((value, i) => (
            <div key={i}>
              <input type="radio" name="visibility" id={value} onChange={handleInputs} />
              <label htmlFor={value}>{value}</label>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          Weather:
          {weatherValues.map((value, i) => (
            <div key={i}>
              <input type="radio" name="weather" id={value} onChange={handleInputs} />
              <label htmlFor={value}>{value}</label>
            </div>
          ))}
        </div>
        <label htmlFor="comment">Comment</label>
        <input type="text" name="comment" onChange={handleInputs} />
        <button type="submit" style={{ width: 'fit-content' }}>Add</button>
      </form>
    </>
  )
}