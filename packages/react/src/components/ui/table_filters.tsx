import { ArrowRight, Filter } from "lucide-react";
import { Button } from "./button.js";
import { PropsWithChildren, useCallback, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command.js";
import { Icon } from "./icon.js";
import { motion, AnimatePresence } from "motion/react";

export type FilterPropertyType = "string" | "number";

export type FilterProperty = {
  label: string;
  icon: string;
  name: string;
};

const Slide = ({ children }: PropsWithChildren) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{
      easings: ["circIn", "circOut"],
    }}
    layout
  >
    {children}
  </motion.div>
);

export const Filters = ({ properties }: { properties: FilterProperty[] }) => {
  const [open, setOpen] = useState(false);
  const [property, setProperty] = useState<FilterProperty>();
  const [operator, setOperator] = useState<string>();

  const List = useCallback(() => {
    if (!property)
      return <PropertiesList properties={properties} onSelect={setProperty} />;

    if (!operator) return <OperatorsList onSelect={setOperator} />;

    return null;
  }, [properties, property, operator]);

  function handleOpen(open: boolean) {
    if (open) {
      setOpen(open);
      return;
    }

    if (operator) {
      setOperator(undefined);
      return;
    }

    if (property) {
      setProperty(undefined);
      return;
    }

    setOpen(false);
  }

  return (
    <>
      <Popover open={open} onOpenChange={handleOpen}>
        <PopoverTrigger asChild>
          <Button size="sm">
            <Filter />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start" sideOffset={8}>
          <Command>
            <CommandInput placeholder="Search..." />
            <AnimatePresence>
              <List />
            </AnimatePresence>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

const PropertiesList = ({
  properties,
  onSelect,
}: {
  properties: FilterProperty[];
  onSelect: (property: FilterProperty) => void;
}) => {
  return (
    <CommandList>
      <CommandGroup>
        <Slide>
          {properties.map((property) => (
            <CommandItem
              key={property.name}
              className="justify-between"
              onSelect={() => onSelect(property)}
            >
              <div className="flex items-center gap-2">
                <Icon icon={property.icon} />
                {property.label}
              </div>
              <ArrowRight />
            </CommandItem>
          ))}
        </Slide>
      </CommandGroup>
    </CommandList>
  );
};

const operators = {
  equals: "Equals",
  contains: "Contains",
  startsWith: "Starts with",
  endsWith: "Ends with",
};

const OperatorsList = ({
  onSelect,
}: {
  onSelect: (operator: string) => void;
}) => {
  return (
    <CommandList>
      <CommandGroup>
        <Slide>
          {Object.entries(operators).map(([name, label]) => (
            <CommandItem
              key={name}
              className="justify-between"
              onSelect={() => onSelect(name)}
            >
              {label}
              <ArrowRight />
            </CommandItem>
          ))}
        </Slide>
      </CommandGroup>
    </CommandList>
  );
};
