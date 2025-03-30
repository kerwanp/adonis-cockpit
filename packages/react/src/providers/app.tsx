import { createContext, PropsWithChildren, useMemo } from "react";
import { InferSerializable } from "adonis-cockpit/types";
import { BaseResource } from "adonis-cockpit";
import { useSafeContext } from "../hooks/use_safe_context.js";
import { RegisteredField, RegisteredLayout } from "../types.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type State = {
  resources: Record<string, InferSerializable<BaseResource>>;
  fields: Record<string, RegisteredField>;
  layouts: Record<string, RegisteredLayout>;
};

const Context = createContext<State | null>(null);

export const $queryClient = new QueryClient();

function reduceByKey<
  TKey extends string,
  TItem extends { [key in TKey]: string },
>(key: TKey, items: TItem[]): Record<string, TItem> {
  return items.reduce(
    (acc, conf) => ({
      ...acc,
      [conf[key]]: conf,
    }),
    {},
  );
}

const AppProvider = ({
  children,
  resources,
  fields: fieldsList,
  layouts: layoutsList,
}: PropsWithChildren<{
  resources: Record<string, InferSerializable<BaseResource>>;
  fields: RegisteredField[];
  layouts: RegisteredLayout[];
}>) => {
  const fields = useMemo(() => reduceByKey("name", fieldsList), [fieldsList]);
  const layouts = useMemo(
    () => reduceByKey("name", layoutsList),
    [layoutsList],
  );

  return (
    <QueryClientProvider client={$queryClient}>
      <Context.Provider value={{ resources, fields, layouts }}>
        {children}
      </Context.Provider>
    </QueryClientProvider>
  );
};

function useApp() {
  return useSafeContext(Context, "App");
}

export { AppProvider, useApp };
