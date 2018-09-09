import * as _ from "lodash";

export type Omit<T extends object, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>;

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return _.omit(obj, keys);
}
