import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUser } from '../database/users';
import styles from './Header.module.scss';
import LogoutButton from './logout/LogoutButton';

export default async function Header() {
  const sessionToken = (await cookies()).get('sessionToken')?.value;
  const user = sessionToken && (await getUser(sessionToken));

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* LEFT */}
        <div className={styles.left}>
          <Link href="/">Homepage</Link>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {user ? (
            <>
              <Link
                href={`/profile/${user.firstName}`}
                className={styles.userLink}
              >
                {user.firstName}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginButton}>
                Login
              </Link>
              <Link href="/register" className={styles.loginButton}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
