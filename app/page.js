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
  const [priority, setPriority] = useState("All");

  const { darkMode } = useDarkMode();

  const taskPriority = () => {
    tasks.map((task) => setPriority(task.priority));
  };

  return (
    <div className="h-screen dark:bg-gray-900">
      <Header />
      <TaskForm tasks={tasks} setTasks={setTasks} priority={priority} />
      <Divider />
      <Filter onPriorityChange={setPriority} />

      {tasks.length > 0 ? (
        <Divider color="divider-primary" darkColor="divider-info">
          <p className="text-dark dark:text-gray-50">{tasks.length}</p>
        </Divider>
      ) : null}
      <TaskList tasks={tasks} setTasks={setTasks} priority={priority} />

      {/* <Divider color="divider-accent" /> */}
    </div>
  );
}
