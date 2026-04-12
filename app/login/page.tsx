import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSession } from '../../database/sessions';
import LoginForm from './LoginForm';
import styles from './LoginForm.module.scss';

export default async function LoginPage() {
  // Logged in user redirect steps in page
  // 1. Get session token from cookie
  const sessionToken = (await cookies()).get('sessionToken')?.value;

  // 2. Check if session token is valid
  const session = !!sessionToken && (await getValidSession(sessionToken));

  // 3. If session token is valid, redirect to homepage
  if (session) {
    redirect('/');
  }

  return (
    <main>
      <LoginForm />
    </main>
  );
}
