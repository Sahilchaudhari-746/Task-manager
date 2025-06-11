import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Login failed');
        return;
      }

      // Optional: Store auth state or token
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userId', data.userId);

      toast.success('Login successful!');
      navigate('/add-task');
        window.location.reload(); // ensure component state resets
    } catch (error) {
      console.error('Sign-in error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignIn} className="auth-form">
        <h2>Task Manager Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        <p style={{ marginTop: '12px', textAlign: 'center' }}>
          Don't have an account? <a href="/Signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
