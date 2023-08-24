import { Gender, NewPatientEntry } from "../src/types";

export function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

export function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function isGender(param: string): param is Gender {
  return Object.values(Gender)
    // we can't assume that gender paramater will be a string
    // that's why we convert it to string
    .map(v => v.toString())
    // if the correct gender is present, true will be returned
    .includes(param);
}

export function parseToString(param: unknown): string {
  if (!isString(param)) throw new Error('Invalid name input');

  return param;
}

export function parseDate(date: unknown): string {
  if (!isString(date) || !isDate(date)) throw new Error('Invalid date input');

  return date;
}

export function parseGender(gender: unknown): Gender {
  if (!isString(gender) || !isGender(gender)) throw new Error('Invalid gender input');

  return gender;
}

function toNewPatientEntry(object: unknown): NewPatientEntry {
  if (!object || typeof object !== 'object') throw new Error('Incorrect or missing data');

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseToString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseToString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseToString(object.occupation),
      entries: []
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
}
export default toNewPatientEntry;