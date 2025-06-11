import React from 'react';
import TaskForm from '../components/TaskForm';

function AddTaskPage() {
    return (
      <div
    style={{
        height: '60vh',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0 16px',
        borderRadius: '16px',
       boxShadow: '0 4px 20px rgba(0, 123, 255, 0.3) 7px 18px 17px',
        maxWidth: '500px',
        margin: 'auto',
        marginTop:'-15rem',
        marginBottom:'-20rem'
    }}
>
    <h2
        style={{
            fontSize: '2.2rem',
            fontWeight: '800',
            color: '#222',
            textAlign: 'center',
            marginBottom: '24px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            borderBottom: '3px solid #007bff',
            paddingBottom: '6px',
            marginTop:'-3rem'
        }}
    >
        Add New Task
    </h2>
    <TaskForm onTaskAdded={() => { }} />
</div>

    );
}

export default AddTaskPage;
