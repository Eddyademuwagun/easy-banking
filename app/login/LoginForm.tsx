'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
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

    if (!form.email || !form.password) {
      return setError('All fields are required');
    }

    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      return setError('Invalid credentials');
    }

    const data = await res.json();
    console.log('Logged in:', data);

    // TODO: redirect user
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
