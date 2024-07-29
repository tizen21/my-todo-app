"use client";

import Header from "./Components/Header";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Filter from "./Components/Filter";
import { useState } from "react";
import { useDarkMode } from "./DarkModeContext";
import Divider from "./Components/ui/Divider";
import Alert from "./Components/ui/Alert";

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
      <Divider color="divider-primary" darkColor="divider-info">
        {tasks.length > 0 ? (
          <p className="text-dark dark:text-info">{tasks.length}</p>
        ) : null}
      </Divider>
      <TaskList tasks={tasks} setTasks={setTasks} priority={priority} />
      <Divider color="divider-accent" darkColor="divider-info" />
    </div>
  );
}
