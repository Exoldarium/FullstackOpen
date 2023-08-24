export function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export function isString(param: unknown): boolean {
  return typeof param === 'string' || param instanceof String;
}

export function parseToString(string: any): string {
  if (!isString(string)) throw new Error('Invalid name input');

  return string;
}