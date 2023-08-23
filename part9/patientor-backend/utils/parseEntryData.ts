import { DiagnoseEntry, DischargeData, HealthCheckRating, NewEntry, SickLeaveData } from "../src/types";
import { parseDate, parseToString } from "./parsePatientData";

function isNumber(number: unknown) {
  return typeof number === 'number';
}

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> => {
  // check if codes in the array are valid
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<DiagnoseEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};

// check if the health check rating is valid
function isRating(param: unknown): param is HealthCheckRating {
  if (typeof param === 'number') {
    return Object.values(HealthCheckRating)
      .map(v => Number(v))
      .includes(param);
  }

  throw new Error('Incorrect or missing data');
}

function parseSickLeave(object: unknown): SickLeaveData {
  // check if sickLeave obj is valid
  if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
    throw new Error('Incorrect or missing data');
  }

  // if it is parse the dates
  const sickLeave = {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };

  return sickLeave;
}

function parseDischarge(object: unknown): DischargeData {
  // check if discharge obj is valid
  if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
    throw new Error('Incorrect or missing data');
  }

  // if it is parse the data
  const discharge = {
    date: parseDate(object.date),
    criteria: parseToString(object.criteria),
  };

  return discharge;
}

export function parseRating(rating: unknown): HealthCheckRating {
  if (!isNumber(rating) || !isRating(rating)) throw new Error('Invalid health rating input');

  // return correct rating type if rating is a number and is correct enum type
  return rating;
}

function toNewEntry(object: unknown): NewEntry {
  if (!object || typeof object !== 'object') throw new Error('Incorrect or missing data');

  if ('type' in object) {
    const type = parseToString(object.type);

    switch (type) {
      case "HealthCheck":
        if (
          'description' in object &&
          'date' in object &&
          'specialist' in object &&
          'healthCheckRating' in object &&
          'diagnosisCodes' in object
        ) {
          const entry: NewEntry = {
            type,
            description: parseToString(object.description),
            date: parseDate(object.date),
            specialist: parseToString(object.specialist),
            healthCheckRating: parseRating(object.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(object)
          };

          return entry;
        }

        break;
      case "OccupationalHealthcare":
        if (
          'description' in object &&
          'date' in object &&
          'specialist' in object &&
          'employerName' in object &&
          'sickLeave' in object &&
          'diagnosisCodes' in object
        ) {
          const entry: NewEntry = {
            type,
            description: parseToString(object.description),
            date: parseDate(object.date),
            specialist: parseToString(object.specialist),
            employerName: parseToString(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
            diagnosisCodes: parseDiagnosisCodes(object)
          };

          return entry;
        }

        break;
      case "Hospital":
        if (
          'description' in object &&
          'date' in object &&
          'specialist' in object &&
          'discharge' in object &&
          'diagnosisCodes' in object
        ) {
          const entry: NewEntry = {
            type,
            description: parseToString(object.description),
            date: parseDate(object.date),
            specialist: parseToString(object.specialist),
            discharge: parseDischarge(object.discharge),
            diagnosisCodes: parseDiagnosisCodes(object)
          };

          return entry;
        }

        break;
      default:
        break;
    }
  }

  throw new Error('Incorrect data: some fields are missing');
}

export default toNewEntry;