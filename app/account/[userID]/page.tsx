import { getUserById } from '../../../database/users';
import Account from './Account';
import styles from './Account.module.scss';

export default async function AccountPage(props) {
  const params = await props.params;
  const user = await getUserById(Number(params.userID));


  return (
    <main>
      <Account user={user} />
    </main>
  );
}
