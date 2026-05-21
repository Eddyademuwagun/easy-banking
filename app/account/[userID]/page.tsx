import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAccountsById } from '../../../database/accounts';
import { getValidSession } from '../../../database/sessions';
import { getUserById } from '../../../database/users';
import styles from './Account.module.scss';
import UserDetails from './UserDetails';

export default async function AccountPage(props) {
  const params = await props.params;
  const user = await getUserById(Number(params.userID));
  const account = await getAccountsById(Number(params.userID));
  const sessionToken = (await cookies()).get('sessionToken')?.value;

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
    </main>
  );
}
