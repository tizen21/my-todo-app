"use client";

import React, { useState } from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "../DarkModeContext";
import Button from "./ui/Button";

export default function TaskForm({ tasks, setTasks }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");

  const handleAddTask = () => {
    if (task === "" || task.length < 3)
      return alert("Invalid task : Minimum 2 car");
    if (priority === "") return alert("Please select a priority");
    setTasks((prev) => [
      ...prev,
      { id: prev.length + 1, task: task, completed: false, priority: priority },
    ]);
    setTask("");
    setPriority("");
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleChangePriority = (e) => {
    setPriority(e.target.value);
  };

  return (
    <div
      className={`m-4 divide-y border divide-gray-100 overflow-hidden bg-white dark:bg-gray-900 ring-1 ring-gray-900/5 sm:rounded-xl dark:border-gray-500`}
    >
      <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 dark:hover:bg-gray-900 sm:px-6">
        <div className="flex min-w-0 gap-x-4 justify-center items-center"></div>
        <div className="flex w-full justify-center gap-x-4 items-center">
          <select
            className="select select-bordered select-md shadow w-full max-w-xs focus:ring-2 ring-offset-2 ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800"
            value={priority}
            onChange={handleChangePriority}
          >
            <option value="" disabled>
              Priority
            </option>
            <option value="High">High</option>
            <option value="Secondary">Secondary</option>
          </select>
          <input
            type="text"
            placeholder="Add a task ..."
            className="input input-bordered input-md w-full max-w-xs shadow focus:ring-2 ring-offset-2 ring-gray-500 focus:placeholder:opacity-0 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800"
            value={task}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          {task && priority && (
            <Button color="info" title="Add" onClick={handleAddTask} />
          )}
        </div>

        <div className="flex shrink-0 items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end"></div>

          {tasks.length > 0 && (
            <TrashIcon
              aria-hidden="true"
              className="h-6 w-6 flex-none text-red-300 hover:cursor-pointer hover:text-black dark:hover:text-gray-50"
              onClick={deleteAllTasks}
            />
          )}
        </div>
      </li>
    </div>
  );
}
