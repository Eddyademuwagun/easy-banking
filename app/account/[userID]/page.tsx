import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAccountsById } from '../../../database/accounts';
import { getValidSession } from '../../../database/sessions';
import { getTransactionsByAccountId } from '../../../database/transactions';
import { getUserById } from '../../../database/users';
import styles from './Account.module.scss';
import AccountDetails from './AccountDetails';
import TransactionDetails from './TransactionDetails';
import UserDetails from './UserDetails';

export default async function AccountPage(props) {
  const params = await props.params;
  const user = await getUserById(Number(params.userID));
  const account = await getAccountsById(Number(params.userID));
  const transactions = await getTransactionsByAccountId(Number(account.id));
  const sessionToken = (await cookies()).get('sessionToken')?.value;

  console.log('This Are The Transactions', transactions);
  // console.log('This is the account', account);

  if (!sessionToken) {
    redirect('/');
  }

  const session = await getValidSession(sessionToken);

  if (!session) {
    redirect('/');
  }

  return (
    <main>
      <UserDetails user={user} />

      <AccountDetails account={account} />

      <TransactionDetails transactions={transactions} />
    </main>
  );
}
