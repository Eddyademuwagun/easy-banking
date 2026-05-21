// app/account/page.tsx (NO 'use client')
import styles from './Account.module.scss';

//   if (!res.ok) {
//     return null;
//   }

//   return res.json();
// }

export default function UserDetails({ user }) {
  const transactions = [];
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
