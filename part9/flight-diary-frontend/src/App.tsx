import { useEffect, useState } from "react";
import diaryService from './services/diaryService';
import { DiaryEntry } from "./types";
import DiaryEntries from "./components/DiaryEntries";
import AddNewEntry from "./components/AddNewEntry";

export default function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    (async () => {
      const diaryEntries = await diaryService.getAll();
      setEntries(diaryEntries);
    })();
  }, []);


  function addNewEntryOnSubmit(entry: DiaryEntry) {
    setEntries(entries.concat(entry));
  }

  return (
    <>
      <DiaryEntries entries={entries} />
      <AddNewEntry addNewEntryOnSubmit={addNewEntryOnSubmit} />
    </>
  );
}
