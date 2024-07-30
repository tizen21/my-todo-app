"use client";

import React, { useState } from "react";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDarkMode } from "../DarkModeContext";
import Alert from "./ui/Alert";

export default function TaskList({ tasks, setTasks, priority }) {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleCheck = (id) => {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id && !item.completed) {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
          return { ...item, completed: !item.completed };
        }
        return item.id === id ? { ...item, completed: !item.completed } : item;
      })
    );
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((item) => item.id != id);
    setTasks(newTasks);
  };

  const handleEditClick = (id, currentText) => {
    setEditTaskId(id);
    setEditTaskText(currentText);
  };

  const handleEditChange = (e) => {
    setEditTaskText(e.target.value);
  };

  const handleSaveEdit = (id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, task: editTaskText } : item
      )
    );
    setEditTaskId(null);
    setEditTaskText("");
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditTaskText("");
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleSaveEdit(id);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (priority === "All") return true;
    return task.priority === priority;
  });

  return (
    <>
      {showAlert && <Alert />}
      <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 dark:bg-gray-900">
        {filteredTasks.map((item) => (
          <li
            key={item.id}
            className={`flex flex-col items-center p-6 m-4 border border-gray-500 bg-gray-50 dark:bg-gray-900 dark:shadow-gray-500/60 sm:px-6 mb-2 rounded-2xl shadow-xl dark:shadow-2xl transition-all duration-300 ${
              item.completed ? "opacity-40" : ""
            }`}
          >
            <div className="flex items-center justify-between w-full transition-shadow duration-300">
              {editTaskId === item.id ? (
                <input
                  type="text"
                  value={editTaskText}
                  onChange={handleEditChange}
                  onKeyDown={(e) => handleEditKeyDown(e, item.id)}
                  className="input input-bordered input-md w-full max-w-xs dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p
                  className={`font-semibold text-md ${
                    item.completed
                      ? "line-through text-accent dark:text-info"
                      : ""
                  } transition-all duration-300 dark:text-gray-100`}
                >
                  {item.task}
                </p>
              )}
              <div className="flex gap-4 items-center">
                {editTaskId === item.id ? (
                  <div className="flex">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-green-400 hover:cursor-pointer hover:text-green-600"
                      onClick={() => handleSaveEdit(item.id)}
                    />
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-400 hover:cursor-pointer hover:text-red-600"
                      onClick={handleCancelEdit}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-x-4">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      id={`task-${item.id}`}
                      className="checkbox checkbox-accent checkbox-md transition-all duration-300 hover:ring-2 ring-offset-2 ring-offset-slate-900 ring-accent dark:checkbox-info dark:ring-info"
                      onChange={() => handleCheck(item.id)}
                    />
                    <PencilIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-gray-400 hover:cursor-pointer hover:text-black dark:hover:text-white"
                      onClick={() => handleEditClick(item.id, item.task)}
                    />
                    <TrashIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-gray-400 hover:cursor-pointer hover:text-red-400 dark:hover:text-red-400"
                      onClick={() => deleteTask(item.id)}
                    />
                  </div>
                )}
                {item.priority === "High" && (
                  <span className="inline-flex items-center justify-center rounded-full bg-red-50 dark:bg-red-200 px-2 py-1 text-xs hover:animate-pulse font-medium text-red-700 dark:text-red-800 ring-1 ring-inset ring-red-600/10 min-w-20">
                    {item.priority}
                  </span>
                )}
                {item.priority === "Secondary" && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-200 px-2 py-1 text-xs font-medium hover:animate-pulse text-blue-700 dark:text-blue-800 ring-1 ring-inset ring-blue-700/10 w-20">
                    {item.priority}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </div>
    </>
  );
}
