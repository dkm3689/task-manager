import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API = "http://localhost:5001/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    fetchTasks();
  };

  const updateTask = async (id, updates) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    setEditingTask(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskForm
        onSubmit={
          editingTask
            ? (data) => updateTask(editingTask._id, data)
            : addTask
        }
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <div className="filter-bar">
        {["all", "pending", "in-progress", "completed"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={setEditingTask}
        onDelete={deleteTask}
        onStatusChange={(id, status) => updateTask(id, { status })}
      />
    </div>
  );
}

export default App;
