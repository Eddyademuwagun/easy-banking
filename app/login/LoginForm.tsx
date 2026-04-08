'use client';

import { useState } from 'react';
import styles from './LoginForm.module.scss';

export default function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      return setError('All fields are required');
    }

    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return setError(data.message || 'Login failed');
      }

      setSuccess('Login successful');

      // Optional: redirect
      // window.location.href = '/dashboard';
    } catch (err) {
      setError('Something went wrong');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
}
