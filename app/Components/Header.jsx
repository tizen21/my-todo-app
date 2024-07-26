"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDarkMode } from "../DarkModeContext";

const navigation = [
  { name: "Form", href: "/" },
  { name: "List", href: "/list" },
  { name: "Team", href: "/team" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <header className="bg-white dark:bg-gray-900">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 dark:hover:text-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex">
            <h1 className="font-bold text-xl text-black dark:text-gray-200 p-4 cursor-pointer dark:hover:text-gray-50">
              My Todo App
            </h1>
          </div>

          <div className="text-black dark:text-gray-300 dark:hover:text-gray-50">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />

              <SunIcon
                aria-hidden="true"
                className="swap-off h-5 w-5 fill-current"
              />

              <MoonIcon
                aria-hidden="true"
                className="swap-on h-5 w-5 fill-current"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 dark:hover:text-gray-50"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300 dark:hover:text-gray-50"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
