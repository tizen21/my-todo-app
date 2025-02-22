"use client";

import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const priorities = [
  { id: 1, name: "All" },
  { id: 2, name: "High" },
  { id: 3, name: "Secondary" },
];

export default function Filter({ onPriorityChange }) {
  const [selected, setSelected] = useState(priorities[0]);

  const handleChange = (priority) => {
    setSelected(priority);
    onPriorityChange(priority.name);
  };

  return (
    <div className="p-4">
      <Listbox value={selected} onChange={handleChange}>
        <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
          Priority
        </Label>
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 dark:focus:ring-white sm:text-sm sm:leading-6 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-gray-50 dark:border-gray-50">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 dark:text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {priorities.map((priority) => (
              <ListboxOption
                key={priority.id}
                value={priority}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 dark:text-gray-50 data-[focus]:bg-gray-800 dark:data-[focus]:bg-gray-900 data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {priority.name}
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-900 dark:text-gray-50 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
