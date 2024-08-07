"use client";

import { useState } from "react";
import { useDarkMode } from "./DarkModeContext";

import Header from "./Components/Header";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Filter from "./Components/Filter";
import Divider from "./Components/ui/Divider";
import Alert from "./Components/ui/Alert";
import Footer from "./Components/Footer";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const [priority, setPriority] = useState("All");

  const { darkMode } = useDarkMode();

  return (
    <div
      className={`h-screen ${
        darkMode ? "dark:bg-gray-900" : ""
      } flex flex-col gap-4`}
    >
      {/* TaskForm = Ajout de nouvelles taches */}
      <TaskForm tasks={tasks} setTasks={setTasks} priority={priority} />
      <Divider color="divider-primary" darkColor="divider-accent" />
      {/* Filter composent pour filtrer par les tasks par priorité */}
      <Filter onPriorityChange={setPriority} />
      {/* Compteur + rendu conditionnel  */}
      {tasks.length > 0 && (
        <Divider color="divider-primary" darkColor="divider-info">
          <p className="text-dark dark:text-gray-50">{tasks.length}</p>
        </Divider>
      )}
      {/* Tasklist qui afifche les tasks */}
      <TaskList tasks={tasks} setTasks={setTasks} priority={priority} />
      <div className="absolute bottom-0 right-2">
        <Footer />
      </div>
    </div>
  );
}
