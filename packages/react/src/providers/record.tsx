import { createContext, PropsWithChildren } from "react";
import { useSafeContext } from "../hooks/use_safe_context.js";

type State = {
  record: any;
};

const Context = createContext<State | null>(null);

export type RecordProviderProps = PropsWithChildren<{
  record: any;
}>;

export const RecordProvider = ({ children, record }: RecordProviderProps) => {
  return <Context.Provider value={{ record }}>{children}</Context.Provider>;
};

export function useRecord() {
  return useSafeContext(Context, "Record");
}
