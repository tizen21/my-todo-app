"use client";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  CheckIcon,
  PencilIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function TaskForm() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    setTasks((prev) => {
      return [...prev, { id: prev.length + 1, task: task, completed: false }];
    });
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleSaveEdit(id);
    }
  };

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

  const deleteAllTasks = () => {
    setTasks([]);
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

  return (
    <>
      <ul
        role="list"
        className="m-4 divide-y divide-gray-100 overflow-hidden bg-white shadow-md ring-1 ring-gray-900/5 sm:rounded-xl "
      >
        <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4 justify-center items-center"></div>
          <div className="flex w-full justify-center gap-x-4 items-center">
            <input
              type="text"
              placeholder="Add a task ..."
              className="input input-bordered input-md w-full max-w-xs shadow focus:ring-2 ring- ring-offset-2 focus:placeholder:opacity-0"
              value={task}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            {task && (
              <PlusCircleIcon
                aria-hidden="true"
                className="h-6 w-6 flex-none text-gray-400 hover:cursor-pointer hover:text-black"
                onClick={handleAddTask}
              />
            )}
          </div>

          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end"></div>

            {tasks.length > 0 ? (
              <TrashIcon
                aria-hidden="true"
                className="h-6 w-6 flex-none text-red-400 hover:cursor-pointer hover:text-black"
                onClick={deleteAllTasks}
              />
            ) : null}
          </div>
        </li>
      </ul>
      <div className="divider divider-info">
        {tasks.length > 0 ? <p className="text-dark">{tasks.length}</p> : null}
      </div>
      <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3">
        {tasks.map((item) => {
          return (
            <li
              key={item.id}
              className="flex flex-col items-center p-6 m-4 bg-gray-50 sm:px-6 mb-2 rounded-2xl shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between w-full">
                {editTaskId === item.id ? (
                  <input
                    type="text"
                    value={editTaskText}
                    onChange={handleEditChange}
                    onKeyDown={(e) => handleEditKeyDown(e, item.id)}
                    className="input input-bordered input-sm w-1/2 max-w-x"
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
                        className="h-6 w-6 text-gray-400 hover:cursor-pointer hover:text-info"
                        onClick={() => handleEditClick(item.id, item.task)}
                      />
                      <TrashIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-gray-400 hover:cursor-pointer hover:text-red-400"
                        onClick={() => deleteTask(item.id)}
                      />
                    </>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </div>
    </>
  );
}
