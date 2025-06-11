import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    // Function to fetch tasks from the server
    const fetchTasks = async () => {
        const userId = parseInt(localStorage.getItem("userId"), 10);
        console.log(userId)
        try {
            const response = await fetch("http://localhost:5000/tasks", {
                method: "GET",
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
        fetchTasks(); // Load tasks when the component mounts
    }, []);

    return (
        <div className="task-list">
            <TaskForm onTaskAdded={fetchTasks} /> {/* Pass refresh function */}
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
            ))}
        </div>
    );
}

export default TaskList;
