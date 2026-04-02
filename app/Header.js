import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/">Homepage</Link>
        {/* <Link href="/send-money">Send Money</Link> */}
        <Link href="/login" className={styles.loginButton}>
          Login
        </Link>
        <Link href="/register" className={styles.loginButton}>
          Register
        </Link>
      </div>
    </header>
  );
}
