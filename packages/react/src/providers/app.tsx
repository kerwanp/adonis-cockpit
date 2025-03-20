import { createContext, PropsWithChildren, useMemo } from "react";
import { InferSerializable } from "adonis-cockpit/types";
import { BaseResource } from "adonis-cockpit";
import { useSafeContext } from "../hooks/use_safe_context.js";
import { RegisteredField } from "../types.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type State = {
  resources: Record<string, InferSerializable<BaseResource>>;
  fields: Record<string, RegisteredField>;
};

const Context = createContext<State | null>(null);

const queryClient = new QueryClient();

const AppProvider = ({
  children,
  resources,
  fields: fieldsList,
}: PropsWithChildren<{
  resources: Record<string, InferSerializable<BaseResource>>;
  fields: RegisteredField[];
}>) => {
  const fields = useMemo(
    () =>
      fieldsList.reduce(
        (acc, conf) => ({
          ...acc,
          [conf.name]: conf,
        }),
        {},
      ),
    [fieldsList],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ resources, fields }}>
        {children}
      </Context.Provider>
    </QueryClientProvider>
  );
};

function useApp() {
  return useSafeContext(Context, "App");
}

export { AppProvider, useApp };
