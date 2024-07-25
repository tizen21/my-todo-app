"use client";

import Header from "./Components/Header";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Filter from "./Components/Filter";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("");

  return (
    <div>
      <Header />
      <TaskForm tasks={tasks} setTasks={setTasks} priority={priority} />
      <div className="divider"></div>
      <Filter priority={priority} />
      <div className="divider">
        {tasks.length > 0 ? <p className="text-dark">{tasks.length}</p> : null}
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} priority={priority} />
    </div>
  );
}
