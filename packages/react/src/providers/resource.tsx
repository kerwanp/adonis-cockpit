import { createContext, PropsWithChildren } from "react";
import { InferSerializable } from "adonis-cockpit/types";
import { BaseResource } from "adonis-cockpit";
import { useSafeContext } from "../hooks/use_safe_context.js";
import { useApp } from "./app.jsx";

type State = {
  resource: InferSerializable<BaseResource>;
};

const Context = createContext<State | null>(null);

const ResourceProvider = ({
  children,
  resource: name,
}: PropsWithChildren<{ resource: string }>) => {
  const { resources } = useApp();
  const resource = resources[name];

  // TODO: Throw error if not found

  return <Context.Provider value={{ resource }}>{children}</Context.Provider>;
};

function useResource() {
  return useSafeContext(Context, "Resource");
}

export { ResourceProvider, useResource };
