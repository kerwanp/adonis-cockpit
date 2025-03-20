import { Context, useContext } from "react";

export function useSafeContext<T>(
  context: Context<T>,
  name: string,
): NonNullable<T> {
  const value = useContext(context);
  if (!value) throw new Error(`${name}Context not found`);
  return value;
}
