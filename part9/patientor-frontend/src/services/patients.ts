import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (entry: NewEntry, id: string) => {
  console.log(entry, id)
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, entry);

  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, addEntry
};

