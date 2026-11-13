function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const priorityColors = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };

  const nextStatus = {
    pending: "in-progress",
    "in-progress": "completed",
    completed: "pending",
  };

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-footer">
        <button
          className="status-btn"
          onClick={() => onStatusChange(task._id, nextStatus[task.status])}
        >
          {task.status}
        </button>
        <div className="task-actions">
          <button onClick={() => onEdit(task)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
