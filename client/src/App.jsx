import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API = "http://localhost:5001/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTasks(data);
    } catch {
      showToast("Failed to load tasks. Is the server running?", "error");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error();
      showToast("Task added");
      fetchTasks();
    } catch {
      showToast("Failed to add task", "error");
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error();
      setEditingTask(null);
      showToast("Task updated");
      fetchTasks();
    } catch {
      showToast("Failed to update task", "error");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("Task deleted");
      fetchTasks();
    } catch {
      showToast("Failed to delete task", "error");
    }
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="app">
      <h1>Task Manager</h1>

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}

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
