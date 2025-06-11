import React, { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';

function TaskListPage() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all'); // all | pending | completed

  const fetchTasks = async () => {
        const userId = parseInt(localStorage.getItem("userId"), 10);
        console.log(userId)
        try {
            const response = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId }),  // ← send userId
            });
            console.log(response)
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };


    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'pending') return !task.status;
        if (filter === 'completed') return task.status;
        return true; // all
    });

    return (
        <div className="page" style={{ textAlign: 'center' }}>
            <h2
                style={{
                    fontSize: '2.2rem',
                    fontWeight: '800',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '16px',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    borderBottom: '3px solid #007bff',
                    display: 'inline-block',
                    paddingBottom: '4px'
                }}
            >
                Task List
            </h2>

            {/* Filter Buttons */}
            <div style={{ margin: '20px 0' }}>
                <button onClick={() => setFilter('all')} className="btn filter-btn">
                    All
                </button>
                <button onClick={() => setFilter('pending')} className="btn filter-btn">
                    Pending
                </button>
                <button onClick={() => setFilter('completed')} className="btn filter-btn">
                    Completed
                </button>
            </div>

            {/* Filtered Task List */}
            {filteredTasks.length === 0 ? (
                <p style={{ color: 'white' }}>No tasks found.</p>
            ) : (
                filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
                ))
            )}
        </div>
    );
}

export default TaskListPage;
