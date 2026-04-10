'use client';

import { useState } from 'react';
// import styles from './page.module.scss';
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
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Register</h2>

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label}>
          Username
          <input
            className={styles.input}
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Lastname
          <input
            className={styles.input}
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Confirm Password
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button className={styles.button} type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}
