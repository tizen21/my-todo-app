"use client";

import React, { useState } from "react";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function TaskList({ tasks, setTasks, priority }) {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const handleCheck = (id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id) => {
    const newTab = tasks.filter((item) => item.id != id);
    setTasks(newTab);
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

  return (
    <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3">
      {tasks.map((item) => (
        <li
          key={item.id}
          className="flex flex-col items-center p-6 m-4 bg-gray-50 sm:px-6 mb-2 rounded-2xl shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between w-full transition-shadow duration-300">
            {editTaskId === item.id ? (
              <input
                type="text"
                value={editTaskText}
                onChange={handleEditChange}
                onKeyDown={(e) => handleEditKeyDown(e, item.id)}
                className="input input-bordered input-md w-full max-w-xs"
              />
            ) : (
              <p
                className={`font-semibold text-md ${
                  item.completed ? "line-through text-green-400" : ""
                } transition-all duration-300`}
              >
                {item.task}
              </p>
            )}
            <div className="flex gap-6 items-center">
              {editTaskId === item.id ? (
                <>
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
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    id={`task-${item.id}`}
                    className="checkbox size-6 transition-all duration-300 hover:ring-2 ring-offset-2 ring-green-400"
                    onChange={() => handleCheck(item.id)}
                  />
                  <PencilIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-400 hover:cursor-pointer hover:text-black"
                    onClick={() => handleEditClick(item.id, item.task)}
                  />
                  <TrashIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-400 hover:cursor-pointer hover:text-red-400"
                    onClick={() => deleteTask(item.id)}
                  />
                </>
              )}
              {item.priority === "High" && (
                <span className="inline-flex items-center justify-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 min-w-20">
                  {item.priority}
                </span>
              )}
              {item.priority === "Secondary" && (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 w-20">
                  {item.priority}
                </span>
              )}
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}
