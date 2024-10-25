

export type Result<T, E> = Ok<T, E> | Err<T, E>;
export type PromiseResult<T, E> = Promise<Result<T, E>>;

export type Ok<T, _> = [null, T];
export type Err<_, E> = [E, null];

export function ok<T, E>(val: T): Ok<T, E> {
  return [null, val];
}

export function err<T, E>(error: E): Err<T, E> {
  return [error, null];
}
