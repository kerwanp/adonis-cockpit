import { createContext, PropsWithChildren, useState } from "react";
import { Commander, CommandItem } from "../components/commander";
import { useSafeContext } from "../hooks/use_safe_context";

type State = {
  updateCommands: (...value: CommandItem[]) => void;
};

const Context = createContext<State | null>(null);

export const CommandProvider = ({ children }: PropsWithChildren) => {
  const [commands, setCommands] = useState<CommandItem[]>([]);

  function updateCommands(...items: CommandItem[]) {
    setCommands(items);
  }

  return (
    <Context.Provider value={{ updateCommands }}>
      <Commander commands={commands} />
      {children}
    </Context.Provider>
  );
};

export const useCommand = () => useSafeContext(Context, "Command");
