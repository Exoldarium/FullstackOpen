import { DiaryEntry } from "../types";

interface DiaryEntryProps {
  entries: DiaryEntry[];
}

export default function DiaryEntries({ entries }: DiaryEntryProps) {
  console.log(entries)
  return (
    <>
      <h1>Diary Entries</h1>
      {entries.map((entry, i) => (
        <div key={i}>
          <p>Date: {entry.date}</p>
          <p>Visibility: {entry.visibility}</p>
          <p>Weather: {entry.weather}</p>
        </div>
      ))}
    </>
  )
}