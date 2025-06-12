import React, { useState } from 'react';
import { toast } from 'react-toastify';

function TaskForm({ onTaskAdded }) {
    const [taskName, setTaskName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskName) return;
        const userId = parseInt(localStorage.getItem("userId"), 10);
        try {
            const response = await fetch('https://task-manager-server-two-silk.vercel.app/add-tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: taskName,userId }),
            });

            if (response.ok) {
                toast.success('Task added successfully');
            } else {
                toast.error('Failed to add task');
                throw new Error('Network response was not ok');
            }

            setTaskName('');
            onTaskAdded();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                gap: '12px',
                flexWrap: 'wrap'
            }}
        >
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Add a new task"
                required
                style={{
                    padding: '12px 18px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    width: '300px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '12px 20px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
            >
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;
