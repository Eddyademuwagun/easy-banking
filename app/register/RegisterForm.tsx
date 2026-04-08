'use client';

import { useState } from 'react';
import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!form.username || !form.lastname || !form.email || !form.password) {
      return setError('All fields are required');
    }

    if (form.password.length < 8) {
      return setError('Password must be at least 8 characters');
    }

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    setError('');

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: form.username,
          lastname: form.lastname,
          password: form.password,
          email: form.email,
        },
      }),
    });
    const responseData = await response.json();
    console.log('Response from API:', responseData);
    console.log('Registering user:', form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Username
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        lastname
        <input
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          required
        />
      </label>

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

      <label>
        Confirm Password
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Create Account</button>
    </form>
  );
}
