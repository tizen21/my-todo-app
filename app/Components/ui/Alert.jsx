import { useState } from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function Alert() {
  const [visible, setVisible] = useState(true);

  return (
    visible && (
      <div className="rounded-md bg-green-50 dark:bg-gray-900 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              aria-hidden="true"
              className="h-5 w-5 text-green-400"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800 dark:text-green-400">
              Task successfully done ...
            </p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className="inline-flex rounded-md bg-green-50 p-1.5 dark:bg-transparent text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                onClick={() => setVisible(false)}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
