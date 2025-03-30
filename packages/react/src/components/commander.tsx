import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command.js";
import { useApp } from "../providers/app.js";
import { Icon } from "./ui/icon.js";
import { router } from "@inertiajs/react";
import { LogOut, LucideIcon } from "lucide-react";

export type CommandItem = {
  icon: LucideIcon;
  label: string;
  group: "page-actions";
  onSelect: () => void;
};

export const Commander = ({ commands }: { commands: CommandItem[] }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroupDynamic
          label="Page Actions"
          commands={commands.filter((c) => c.group === "page-actions")}
          onOpenChange={setOpen}
        />
        <ResourcesGroup onOpenChange={setOpen} />
        <ActionsGroup onOpenChange={setOpen} />
      </CommandList>
    </CommandDialog>
  );
};

const CommandGroupDynamic = ({
  commands,
  label,
  onOpenChange,
}: {
  commands: CommandItem[];
  label: string;
  onOpenChange: (value: boolean) => void;
}) => {
  return (
    <CommandGroup heading={label}>
      {commands.map((command, i) => (
        <CommandItem
          key={i}
          onSelect={() => {
            onOpenChange(false);
            command.onSelect();
          }}
        >
          <command.icon />
          {command.label}
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

const ResourcesGroup = ({
  onOpenChange,
}: {
  onOpenChange: (value: boolean) => void;
}) => {
  const { resources } = useApp();

  return (
    <CommandGroup heading="Resources">
      {Object.values(resources).map((resource) => (
        <CommandItem
          key={resource.name}
          onSelect={() => {
            router.visit(resource.route);
            onOpenChange(false);
          }}
        >
          <Icon icon={resource.icon} />
          {resource.labelPlural}
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

const ActionsGroup = ({
  onOpenChange,
}: {
  onOpenChange: (value: boolean) => void;
}) => {
  return (
    <CommandGroup heading="Actions">
      <CommandItem
        onSelect={() => {
          router.visit("/logout");
          onOpenChange(false);
        }}
      >
        <LogOut />
        Logout
      </CommandItem>
    </CommandGroup>
  );
};
