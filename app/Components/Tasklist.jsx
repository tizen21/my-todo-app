"use client";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Tasklist() {
  const [checked, setChecked] = useState(false);

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
        <div className="flex min-w-0 gap-x-4 justify-center items-center">
          <input
            type="checkbox"
            checked="checked"
            className="checkbox"
            onChange={!setChecked}
          />
        </div>
        <div className="flex w-full justify-center">
          <input
            type="text"
            placeholder="Add a task ..."
            className="input input-bordered input-md w-full max-w-xs focus:ring-2 ring-blue-700"
          />
        </div>

        <div className="flex shrink-0 items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end"></div>
          <PlusIcon
            aria-hidden="true"
            className="h-5 w-5 flex-none text-gray-400 hover:cursor-pointer hover:text-black"
          />
          <TrashIcon
            aria-hidden="true"
            className="h-5 w-5 flex-none text-gray-400 hover:cursor-pointer hover:text-black"
          />
        </div>
      </li>
    </ul>
  );
}
