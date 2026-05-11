// app/account/page.tsx (NO 'use client')
import styles from './Account.module.scss';

// async function getUser() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me`, {
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     return null;
//   }

//   return res.json();
// }

export default function Account() {
  // const data = await getUser();

  // if (!data) {
  //   redirect('/login');
  // }

  // const user = data.user;
  const user = {
    name: 'Eddy',
    email: 'edeboy2002@yahoo.com',
    balance: 100,
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My Account</h1>

      <div className={styles.card}>
        <h2>Account Details</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Name:</strong> {user.name || 'N/A'}
        </p>
      </div>

      <div className={styles.card}>
        <h2>Balance</h2>
        <p className={styles.balance}>€{user.balance || '0.00'}</p>
      </div>
    </div>
  );
}
