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

export default function Account({ user }) {
  const transactions = [
    {
      id: 1,
      type: 'Deposit',
      amount: 200,
      date: '2026-05-14',
    },
    {
      id: 2,
      type: 'Purchase',
      amount: -45,
      date: '2026-05-13',
    },
    {
      id: 3,
      type: 'Transfer',
      amount: -20,
      date: '2026-05-12',
    },
  ];
  // const data = await getUser();

  // if (!data) {
  //   redirect('/login');
  // }

  // const user = data.user;
  // const user = {
  //   name: 'Eddy',
  //   email: 'edeboy2002@yahoo.com',
  //   balance: 100,
  // };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My Account</h1>

      <div className={styles.card}>
        <h2>Account Details</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Name:</strong> {user.firstName}
        </p>
      </div>

      <div className={styles.card}>
        <h2>Balance</h2>
        <p className={styles.balance}>€{user.balance}</p>
      </div>

      <div className={styles.card}>
        <h2>Transactions</h2>

        {transactions.map((transaction) => (
          <div key={transaction.id} className={styles.transaction}>
            <div>
              <p>{transaction.type}</p>
              <small>{transaction.date}</small>
            </div>

            <p
              className={
                transaction.amount > 0 ? styles.income : styles.expense
              }
            >
              {transaction.amount > 0 ? '+' : ''}€{transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
