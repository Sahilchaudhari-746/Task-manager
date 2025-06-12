import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './TaskItem.css';

function TaskItem({ task, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task.task);
    const userId = parseInt(localStorage.getItem("userId"), 10);
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://task-manager-server-two-silk.vercel.app/tasks/${task.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),  // ← send userId

            });
            if (response.ok) toast.success("Task deleted successfully!");
            else throw new Error();
            onUpdate();
        } catch {
            toast.error("Failed to delete task!");
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://task-manager-server-two-silk.vercel.app/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: updatedTask,userId }),
            });
            if (response.ok) {
                toast.success("Task updated!");
                setIsEditing(false);
                onUpdate();
            } else {
                throw new Error();
            }
        } catch {
            toast.error("Error updating task!");
        }
    };

    const markAsCompleted = async () => {
        try {
            const response = await fetch(`https://task-manager-server-two-silk.vercel.app/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: task.task, status: true,userId }),
            });
            if (response.ok) toast.success("Marked as completed!");
            else throw new Error();
            onUpdate();
        } catch {
            toast.error("Failed to mark as completed!");
        }
    };

    return (
        <div className="task-card-horizontal">
            <div className="task-info">
                <h2 className="task-title">{task.task}</h2>
                <p className="task-status">
                    Status: <span className={task.status ? 'completed' : 'pending'}>
                        {task.status ? 'Completed' : 'Pending'}
                    </span>
                </p>
            </div>
            <div className="task-actions-horizontal">
                <button className="btn update" onClick={() => setIsEditing(true)}  disabled={task.status}>Update</button>
                <button className="btn delete" onClick={handleDelete}>Delete</button>
                <button
                    className="btn complete"
                    onClick={markAsCompleted}
                    disabled={task.status}
                >
                    {task.status ? 'Completed' : 'Mark as Completed'}
                </button>
            </div>

            {isEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Task</h3>
                        <input
                            type="text"
                            value={updatedTask}
                            onChange={(e) => setUpdatedTask(e.target.value)}
                        />
                        <div className="modal-buttons">
                            <button className="btn save" onClick={handleUpdate}>Save</button>
                            <button className="btn cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskItem;
