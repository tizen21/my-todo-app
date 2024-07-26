"use client";

import Header from "./Components/Header";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Filter from "./Components/Filter";
import { useState } from "react";
import { useDarkMode } from "./DarkModeContext";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("");
  const { darkMode } = useDarkMode();

  return (
    <div className="h-screen dark:bg-gray-900">
      <Header />
      <TaskForm tasks={tasks} setTasks={setTasks} priority={priority} />
      {/* <div className="divider"></div>
      <Filter priority={priority} /> */}
      <div className="divider dark:text-white dark:divider-info">
        {tasks.length > 0 ? <p className="text-dark">{tasks.length}</p> : null}
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} priority={priority} />
    </div>
  );
}
